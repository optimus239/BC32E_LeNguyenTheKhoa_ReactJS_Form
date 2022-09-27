import React, { Component } from "react";
import DanhSachSinhVien from "./DanhSachSinhVien";
import FormDangKy from "./FormDangKy";

export default class BTForm extends Component {
  render() {
    return (
      <div className="container">
        <FormDangKy />
        <DanhSachSinhVien />
      </div>
    );
  }
}
