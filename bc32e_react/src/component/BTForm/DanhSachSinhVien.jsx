import React, { Component } from "react";
import { connect } from "react-redux";

class DanhSachSinhVien extends Component {
  render() {
    const { mangSinhVien } = this.props;
    return (
      <form className="mt-3">
        <table className="w-full">
          <thead
            className="bg-slate-900 text-white text-left"
            style={{ height: "40px" }}
          >
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
          </thead>
          <tbody>
            {mangSinhVien.map((item, index) => (
              <tr key={index}>
                <td>{item.maSV}</td>
                <td>{item.hoTen}</td>
                <td>{item.soDienThoai}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    className="bg-red-500 rounded-sm px-4 py-3 mr-3"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.dispatch({
                        type: "DELETE_USER",
                        payload: item.id,
                      });
                    }}
                  >
                    Xóa
                  </button>
                  <button
                    className="bg-blue-500 rounded-sm px-4 py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.dispatch({
                        type: "EDIT_USER",
                        payload: item.id,
                      });
                    }}
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.baiTapForm,
  };
};

export default connect(mapStateToProps)(DanhSachSinhVien);
