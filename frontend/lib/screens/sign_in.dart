import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frontend/widgets/custom_text_field.dart';

class SignInScreen extends StatefulWidget {
  const SignInScreen({super.key});

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  String _email = '';
  String _password = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          centerTitle: true,
          title: const Text(
            'Sign In',
            style: TextStyle(
                color: Colors.black, fontSize: 18, fontWeight: FontWeight.bold),
          ),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                CupertinoIcons.heart_fill,
                color: Colors.red,
                size: 24.0,
              ),
              Text(_email),
              Text(_password),
              CustomTextField(
                  hint: 'Email',
                  icon: CupertinoIcons.person_fill,
                  inputType: TextInputType.emailAddress,
                  onChanged: (value) => {setState(() => _email = value)}),
              CustomTextField(
                  hint: 'Password',
                  icon: CupertinoIcons.staroflife_fill,
                  inputType: TextInputType.text,
                  obscureText: true,
                  onChanged: (value) => setState(() => _password = value)),
            ],
          ),
        ));
  }
}
