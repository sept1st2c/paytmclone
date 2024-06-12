import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Header } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Header label={"Sign up"}></Header>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>
          <InputBox label={"First Name"} placeholder={"John"}></InputBox>
          <InputBox label={"Second Name"} placeholder={"Doe"}></InputBox>
          <InputBox label={"Email"} placeholder={"example@12.com"}></InputBox>
          <InputBox label={"Password"} placeholder={"12345678"}></InputBox>
          <div className="pt-4">
            <Button onClick={""} label={"Sign up"} />
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
