import React, { Component } from "react";
import { connect } from "react-redux";

class FormDangKy extends Component {
  stateDefault = {
    maSV: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
  };

  state = {
    values: this.stateDefault,
    search: this.stateDefault,
    errors: {},
  };

  handleState = (event) => {
    const { name, value } = event.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };

  changeSearch = (event) => {
    const { value } = event.target;
    this.setState({
      search: {
        ...this.state.search,
        maSV: value,
        hoTen: value,
        soDienThoai: value,
        email: value,
      },
    });
  };

  handleSearch = (event) => {
    this.props.dispatch({
      type: "SEARCH_USER",
      payload: this.state.search,
    });
  };

  handleBlur = (event) => {
    const {
      title,
      name,
      minLength,
      maxLength,
      validity: { valueMissing, tooShort, patternMismatch },
      validationMessage,
    } = event.target;

    let mess = "";

    if (valueMissing) {
      mess = `${title} không được bỏ trống!`;
    }

    if (tooShort) {
      mess = `${title} nhiều hơn ${minLength} ký tự và ít hơn ${maxLength} ký tự`;
    }

    if (patternMismatch) {
      mess = `${title} không đúng định dạng`;
    }

    this.setState({
      errors: {
        ...this.state.errors,
        [name]: mess,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("submit", this.state);
    if (!event.target.checkValidity()) {
      return;
    }

    this.props.dispatch({
      type: this.props.selectedUser ? "UPDATE_USER" : "ADD_USER",
      payload: this.state.values,
    });

    this.setState({
      values: this.stateDefault,
    });
  };

  static getDerivedStateFromProps = (nextProps, currentState) => {
    // console.log("nextprops", nextProps, "currentstate", currentState);
    if (
      nextProps.selectedUser &&
      nextProps.selectedUser.id !== currentState.values.id
    ) {
      currentState.values = nextProps.selectedUser;
    }
    return currentState;
  };

  render() {
    // console.log(this.state);
    // const { selectedUser } = this.props;
    const { maSV, hoTen, soDienThoai, email } = this.state.values;
    return (
      <div>
        <div
          className="bg-slate-900 flex items-center"
          style={{ height: "50px" }}
        >
          <span className="text-white text-2xl pl-3">Thông tin sinh viên</span>
        </div>
        <div>
          {/*onSubmit: lấy giá trị state */}
          <form
            noValidate
            // onSubmit={(event) => {
            //   console.log("submit", this.state);
            // }}
            onSubmit={this.handleSubmit}
          >
            <div className="grid grid-cols-2 gap-6 mt-3">
              <div>
                <div>Mã SV</div>
                <input
                  type="text"
                  required
                  title="Mã sinh viên"
                  name="maSV"
                  minLength={3}
                  maxLength={16}
                  value={maSV}
                  className="w-full border-2 border-slate-300 rounded-md p-3"
                  // onChange={(event) => {
                  //   this.setState({
                  //     maSV: event.target.value,
                  //   });
                  // }}
                  // onChange={(event) => this.handleState(event)}
                  onChange={this.handleState}
                  onBlur={this.handleBlur}
                />
                <span className="text-red-500">{this.state.errors.maSV}</span>
              </div>
              <div>
                <div>Họ tên</div>
                <input
                  type="text"
                  required
                  title="Họ tên"
                  name="hoTen"
                  minLength={3}
                  maxLength={32}
                  value={hoTen}
                  className="w-full border-2 border-slate-300 rounded-md p-3"
                  // onChange={(event) => {
                  //   this.setState({
                  //     hoTen: event.target.value,
                  //   });
                  // }}
                  onChange={this.handleState}
                  onBlur={this.handleBlur}
                />
                <span className="text-red-500">{this.state.errors.hoTen}</span>
              </div>
              <div>
                <div>Số điện thoại</div>
                <input
                  type="text"
                  required
                  title="Số điện thoại"
                  name="soDienThoai"
                  minLength={3}
                  maxLength={16}
                  pattern="^[0-9]*$"
                  value={soDienThoai}
                  className="w-full border-2 border-slate-300 rounded-md p-3"
                  // onChange={(event) => {
                  //   this.setState({
                  //     soDienThoai: event.target.value,
                  //   });
                  // }}
                  onChange={this.handleState}
                  onBlur={this.handleBlur}
                />
                <span className="text-red-500">
                  {this.state.errors.soDienThoai}
                </span>
              </div>
              <div>
                <div>Email</div>
                <input
                  type="text"
                  required
                  title="Email"
                  name="email"
                  minLength={3}
                  maxLength={32}
                  value={email}
                  pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                  className="w-full border-2 border-slate-300 rounded-md p-3"
                  // onChange={(event) => {
                  //   this.setState({
                  //     email: event.target.value,
                  //   });
                  // }}
                  onChange={this.handleState}
                  onBlur={this.handleBlur}
                />
                <span className="text-red-500">{this.state.errors.email}</span>
              </div>
              <div>
                <button
                  type="submit"
                  className={`rounded-md w-32 h-11 bg-green-500 text-white mr-3 ${
                    !this.props.selectedUser ? "" : "hidden"
                  }`}
                >
                  Thêm sinh viên
                </button>
                <button
                  type="submit"
                  //?? => bắt null - undefined
                  className={`rounded-md w-32 h-11 bg-yellow-500 text-white mr-3 ${
                    this.props.selectedUser ?? "hidden"
                  }`}
                >
                  Cập nhật
                </button>
              </div>
              <div>
                <input
                  id="search"
                  type="text"
                  className="border-2 border-slate-300 rounded-md p-2"
                  onChange={this.changeSearch}
                />
                <button
                  form="search"
                  className="rounded-md w-32 h-11 bg-blue-500 text-white ml-3"
                  onClick={this.handleSearch}
                >
                  Tìm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.baiTapForm,
  };
};

export default connect(mapStateToProps)(FormDangKy);
