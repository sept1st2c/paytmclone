import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Header } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";

export const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Header label={"Sign up"}></Header>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>

          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"John"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"Doe"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeholder={"example@12.com"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"12345678"}
          ></InputBox>

          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    firstname,
                    lastname,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
              }}
              label={"Sign up"}
            />
          </div>

          <BottomWarning
            label={"Already have an account? "}
            buttonText={"Sign in"}
            to={"http://localhost:5173/signin"}
          />
        </div>
      </div>
    </div>
  );
};
