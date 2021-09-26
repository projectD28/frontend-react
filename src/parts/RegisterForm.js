import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import users from "constants/api/users";

import useForm from "helpers/hooks/useForm";
import fieldErrors from "helpers/fieldErrors";

import Select from "components/Form/Select";
import Input from "components/Form/Input";

function RegisterForm({ history }) {
  const [
    { name, email, password, profession, otherProfession },
    setState,
    newState,
  ] = useForm({
    name: "",
    email: "",
    password: "",
    profession: "",
    otherProfession: "",
  });

  const [errors, seterror] = useState(null);

  function submit(e) {
    e.preventDefault();

    users
      .register({
        name,
        email,
        password,
        profession: profession === "others" ? otherProfession : profession,
      })
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        seterror(err?.response?.data?.message);
      });
  }

  const Errors = fieldErrors(errors);

  console.log(name, email, password, profession, otherProfession);

  return (
    <div className="flex justify-center items-center pb-24">
      <div className="w-3/12">
        <h1 className="text-4xl text-gray-900 mb-6">
          <span className="font-bold">Grow Skills</span> From, <br />
          Anywhere
        </h1>
        <form onSubmit={submit}>
          <Input
            error={Errors?.name?.message}
            name="name"
            onChange={setState}
            placeholder="Your name"
            value={name}
            labelName="Full Name"
          />

          <Input
            error={Errors?.email?.message}
            value={email}
            name="email"
            type="email"
            onChange={setState}
            placeholder="Your email address"
            labelName="Email Address"
          />

          <Input
            error={Errors?.password?.message}
            value={password}
            name="password"
            type="password"
            onChange={setState}
            placeholder="Your password"
            labelName="Password"
          />

          <Select
            labelName="Occupation"
            name="profession"
            value={profession}
            fallbackText="Select your focus"
            onClick={setState}
          >
            <option value="">Select your focus</option>
            <option value="Web Designer">Web Designer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Others">Others</option>
          </Select>
          {profession === "Others" && (
            <Input
              error={Errors?.otherProfession?.message}
              value={otherProfession}
              name="otherProfession"
              type="text"
              onChange={setState}
              placeholder="Your Occupation"
              labelName="Other Occupation"
            />
          )}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full"
          >
            Daftar
          </button>
        </form>
      </div>

      <div className="w-1/12"></div>

      <div className="w-5/12 flex justify-end pt-24 pr-16">
        <div className="relative" style={{ width: 369, height: 440 }}>
          <div
            className="absolute border-indigo-700 border-2 -mt-8 -ml-16 left-0"
            style={{ width: 324, height: 374 }}
          ></div>
          <div className="absolute w-full h-full -mb-8 -ml-8">
            <img src="/assets/images/james.jpg" alt="Testimonial User" />
          </div>
          <div
            className="absolute z-10 bg-white bottom-0 right-0 py-3 px-4 -mr-12"
            style={{ width: 290 }}
          >
            <p className="text-gray-900 mb-2">
              Semua materi terstruktrur baik dan mentor yang sangat lihai
            </p>
            <span className="text-gray-600">James, Apps Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RegisterForm);
