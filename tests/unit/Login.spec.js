import { mount } from "@vue/test-utils";
import Login from "@/components/Login.vue";

import axios from "axios";


import router from "@/router";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

jest.mock("@/router", () => ({
  push: jest.fn(),
}));

describe("Login", () => {
  
  it("check all form-item exist", () => {
    const wrapper = mount(Login);
    wrapper.vm.$nextTick();
    const inputs = wrapper.findAllComponents({ name: "ElInput" });
    const usernameInput = inputs.at(0);
    const passwordInput = inputs[1];
    const Button = wrapper.findAllComponents({ name: "ElButton" });
    const loginButton = Button[0];
    
    expect(usernameInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);
    expect(loginButton.exists()).toBe(true);
  });
  it("should return token on successful login ", async () => {
    //set token
    const mockToken = "mockToken";
    //set res
    const mockResponse = { status: 200, data: { authorization: mockToken } };
    const axiosPostSpy = jest
      .spyOn(axios, "post")
      .mockResolvedValue(mockResponse);
    const routerPushSpy = jest.spyOn(router, "push");
    const wrapper = mount(Login);

    const inputs = wrapper.findAllComponents({ name: "ElInput" });
    const usernameInput = inputs[0];
    const passwordInput = inputs[1];
    
    

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    await usernameInput.setValue("testuser");
    await passwordInput.setValue("testpassword");
    await wrapper.vm.submitForm();

    expect(axiosPostSpy).toHaveBeenCalledWith(
      "http://34.80.66.28:3000/user/login",
      { username: "testuser", password: "testpassword" },
      { headers: { "Content-Type": "application/json" } }
    );
    expect(wrapper.vm.token).toBe(mockToken);
    expect(routerPushSpy).toHaveBeenCalledWith("/chat");
  });
  it("should return the expected response if login failed", async () => {
    //set error
    const error = new Error("Unauthorized");
    error.response = {
      status: 401,
      data: { message: "Unauthorized" },
    };

    //set res

    const axiosPostSpy = jest.spyOn(axios, "post").mockRejectedValue(error);
    
    const wrapper = mount(Login);

    const inputs = wrapper.findAllComponents({ name: "ElInput" });
    const usernameInput = inputs[0];
    const passwordInput = inputs[1];
    
    

    await usernameInput.setValue("testuser");
    await passwordInput.setValue("testpassword");

    await wrapper.vm.submitForm();

    await wrapper.vm.$nextTick(); // wait for DOM updates

    expect(axiosPostSpy).toHaveBeenCalledWith(
      "http://34.80.66.28:3000/user/login",
      { username: "testuser", password: "testpassword" },
      { headers: { "Content-Type": "application/json" } }
    );

    expect(wrapper.vm.error.message).toBe("Unauthorized");
  });
});
