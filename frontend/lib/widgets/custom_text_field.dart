import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class CustomTextField extends StatefulWidget {
  final String hint;
  final TextInputType inputType;
  final bool obscureText;
  final Function onChanged;
  final IconData icon;

  const CustomTextField({
    super.key,
    required this.hint,
    required this.onChanged,
    required this.icon,
    this.inputType = TextInputType.text,
    this.obscureText = false,
  });

  @override
  _CustomTextFieldState createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  late Color currentColor;
  bool obscured = false;

  @override
  void initState() {
    super.initState();
    obscured = !!widget.obscureText;
  }

  void toggleObscuredText() => setState(() => obscured = !obscured);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 40, left: 20, right: 20),
      decoration: BoxDecoration(boxShadow: [
        BoxShadow(
            color: const Color(0xff1D1617).withOpacity(0.11),
            blurRadius: 40,
            spreadRadius: 0.0)
      ]),
      child: TextField(
        obscureText: obscured,
        keyboardType: widget.inputType,
        onChanged: (value) => widget.onChanged(value),
        decoration: InputDecoration(
            filled: true,
            fillColor: Colors.white,
            contentPadding: const EdgeInsets.all(15),
            hintText: widget.hint,
            hintStyle: const TextStyle(color: Color(0xffDDDADA), fontSize: 14),
            prefixIcon: Padding(
              padding: const EdgeInsets.all(12),
              child: Icon(
                widget.icon,
                color: Colors.black87,
                size: 24.0,
              ),
            ),
            suffixIcon: widget.obscureText
                ? SizedBox(
                    width: 100,
                    child: IntrinsicHeight(
                      child: InkWell(
                        onTap: toggleObscuredText,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            const VerticalDivider(
                              color: Colors.black,
                              indent: 10,
                              endIndent: 10,
                              thickness: 0.1,
                            ),
                            Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Icon(
                                  obscured
                                      ? CupertinoIcons.eye_slash
                                      : CupertinoIcons.eye,
                                  color: Colors.black38,
                                  size: 24.0,
                                ))
                          ],
                        ),
                      ),
                    ),
                  )
                : null,
            border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(15),
                borderSide: BorderSide.none)),
      ),
    );
  }
}
