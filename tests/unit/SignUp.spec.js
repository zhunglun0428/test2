import { mount } from "@vue/test-utils";
import SignUp from "@/components/SignUp.vue";

import axios from "axios";

import router from "@/router";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

jest.mock("@/router", () => ({
  push: jest.fn(),
}));

describe("SignUp", () => {
  it("check all form-item exist", () => {
    const wrapper = mount(SignUp);
    wrapper.vm.$nextTick();
    const inputs = wrapper.findAllComponents({ name: "ElInput" });
    wrapper.vm.$nextTick();
    const usernameInput = inputs[0];
    const emailInput = inputs[1];
    const passwordInput = inputs[2];
    const confirmPasswordInput = inputs[3];

    const Button = wrapper.findAllComponents({ name: "ElButton" });
    const signUpButton = Button[0];
    expect(usernameInput.exists()).toBe(true);
    expect(emailInput.exists()).toBe(true);
    expect(confirmPasswordInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);

    expect(signUpButton.exists()).toBe(true);
  });
  it("should go to choosePic page on successful signUp ", async () => {
    //set token
    //set res
    const mockResponse = { status: 200 };
    const axiosPostSpy = jest
      .spyOn(axios, "post")
      .mockResolvedValue(mockResponse);
    const routerPushSpy = jest.spyOn(router, "push");
    const wrapper = mount(SignUp);
    wrapper.vm.$nextTick();
    const inputs = wrapper.findAllComponents({ name: "ElInput" });
    wrapper.vm.$nextTick();
   const usernameInput = inputs[0];
    const emailInput = inputs[1];
    const passwordInput = inputs[2];
    const confirmPasswordInput = inputs[3];

    await wrapper.vm.$nextTick();

    await usernameInput.setValue("testuser");
    await passwordInput.setValue("testpassword");
    await emailInput.setValue("test@example.com");
    await confirmPasswordInput.setValue("testpassword");
    await wrapper.vm.submitForm();

    expect(axiosPostSpy).toHaveBeenCalledWith(
      "http://34.80.66.28:3000/user/register",
      {
        name: "testuser",
        password: "testpassword",
        email: "test@example.com",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    expect(routerPushSpy).toHaveBeenCalledWith("/choosePicture");
  });
  it("should return the expected response if signUp failed", async () => {
    //set error
    const error = new Error("Unauthorized");
    error.response = {
      status: 401,
      data: { message: "Unauthorized" },
    };

    //set res

    const axiosPostSpy = jest.spyOn(axios, "post").mockRejectedValue(error);
    const routerPushSpy = jest.spyOn(router, "push");
    const wrapper = mount(SignUp);
    wrapper.vm.$nextTick();
    const inputs = wrapper.findAllComponents({ name: "ElInput" });
    wrapper.vm.$nextTick();
    const usernameInput = inputs[0];
    const emailInput = inputs[1];
    const passwordInput = inputs[2];
    const confirmPasswordInput = inputs[3];

    await usernameInput.setValue("testuser");
    await passwordInput.setValue("testpassword");
    await emailInput.setValue("test@example.com");
    await confirmPasswordInput.setValue("testpassword");
    await wrapper.vm.submitForm();

    await wrapper.vm.$nextTick(); // wait for DOM updates

    expect(axiosPostSpy).toHaveBeenCalledWith(
      "http://34.80.66.28:3000/user/register",
      {
        name: "testuser",
        password: "testpassword",
        email: "test@example.com",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    expect(wrapper.vm.error.message).toBe("Unauthorized");
  });
});
