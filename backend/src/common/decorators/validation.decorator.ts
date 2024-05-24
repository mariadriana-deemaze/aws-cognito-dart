import {
  equals,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator';

export const Match =
  <T>(property: keyof T, options?: ValidationOptions) =>
  (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [property],
      validator: MatchConstraint
    });

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args?: ValidationArguments): boolean {
    const [propertyNameToCompare] = args?.constraints || [];
    const propertyValue = (args?.object as never)[propertyNameToCompare];
    return equals(value, propertyValue);
  }

  defaultMessage(args?: ValidationArguments): string {
    const [propertyNameToCompare] = args?.constraints || [];
    return `${args?.property} does not match the ${propertyNameToCompare}`;
  }
}
