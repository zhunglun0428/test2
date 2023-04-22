<template lang="">
  <el-card>
    <h1>Sign Up</h1>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-position="top"
      label-width="150px"
      :rules="rules"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input v-model="ruleForm.confirmPassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="signUp">Create Account</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import axios from "axios";
import router from "@/router";
export default {
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: { message: "" },
      rules: {
        name: [
          {
            required: true,
            message: "Please input your name",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input your password",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "Please confirm your password",
            trigger: "blur",
          },
          { validator: this.checkConfirmPassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async checkConfirmPassword(rule, value, callback) {
      if (value !== this.ruleForm.password) {
        callback(new Error("Two passwords are inconsistent!"));
      } else {
        callback();
      }
    },
    async signUp() {
      this.$refs.ruleFormRef
        .validate()
        .then(() => {
          this.submitForm();
          

          console.log("success");
        })
        .catch(() => {
          this.$message.error("表單驗證不通過");
        });
    },
    async submitForm() {
      const url = "http://34.80.66.28:3000/user/register";
      const data = {
        name: this.ruleForm.name,
        password: this.ruleForm.password,
        email: this.ruleForm.email,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post(url, data, config)
        .then((response) => {
          console.log(response.data);
          router.push("/choosePicture");
        })
        .catch((error) => {
          console.log(error);
          this.error.message = error.message
        });
    },
    
  },
};
</script>
<style>
.el-form {
  font-size: 16px;
}
.el-card {
  width: 480px;
  height: 440px;
}
.logo {
  width: 100px; /* 設置元素寬度 */
  height: 100px; /* 設置元素高度 */
  border-radius: 50%; /* 設置邊框半徑為50% */
  margin-left: 170px;
}
.link {
  color: chartreuse;
}
</style>
