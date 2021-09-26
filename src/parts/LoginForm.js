import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import users from "constants/api/users";
import setAuthorizationHeader from "configs/axios/setAuthorizationHeader";

import { populateProfile } from "store/actions/users";
import useForm from "helpers/hooks/useForm";

import Input from "components/Form/Input";
import fieldErrors from "helpers/fieldErrors";

function LoginForm({ history }) {
  const dispatch = useDispatch();

  const [{ email, password }, setState, newState] = useForm({
    email: "",
    password: "",
  });

  const [errors, seterror] = useState(null);

  function submit(e) {
    e.preventDefault();

    users
      .login({ email, password })
      .then((res) => {
        setAuthorizationHeader(res.data.token);

        users.details().then((detail) => {
          dispatch(populateProfile(detail.data));
          const production = process.env.REACT_APP_FRONTPAGE_URL;

          localStorage.setItem(
            "BWAMICRO:token",
            JSON.stringify({ ...res.data, email: email })
          );

          const redirect = localStorage.getItem("BWAMICRO:redirect");
          const userCookie = {
            name: detail.data.name,
            thumbnail: detail.data.avatar,
          };

          const expires = new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          );

          document.cookie = `BWAMICRO:user=${JSON.stringify(
            userCookie
          )}; expires=${expires.toUTCString()}; path:/ : ${production}`;

          history.push(redirect || "/");
        });
      })
      .catch((err) => {
        seterror(err?.response?.data?.message);
      });
  }

  const Errors = fieldErrors(errors);

  return (
    <div className="flex justify-center items-center pb-24">
      <div className="w-3/12">
        <h1 className="text-4xl text-gray-900 mb-6">
          <span className="font-bold">Continue</span> Study, <br />
          Finish your <span className="font-bold">Goals</span>
        </h1>
        <form onSubmit={submit}>
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

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full"
          >
            Masuk
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
            <img
              src="/assets/images/img-hero-women.jpg"
              alt="Testimonial User"
            />
          </div>
          <div
            className="absolute z-10 bg-white bottom-0 right-0 py-3 px-4 -mr-12"
            style={{ width: 290 }}
          >
            <p className="text-gray-900 mb-2">
              Metode belajar yang santai seperti nonton drakor di Netflix
            </p>
            <span className="text-gray-600">Alyssa, Apps Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
