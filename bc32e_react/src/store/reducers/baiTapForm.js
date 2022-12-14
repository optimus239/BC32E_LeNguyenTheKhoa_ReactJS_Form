const stateDefault = {
  mangSinhVien: [
    // {
    //   id: 1237982173,
    //   maSV: 123,
    //   hoTen: "Nguyễn Văn A",
    //   soDienThoai: 938111111,
    //   email: "nguyenvana@gmail.com",
    // },
    // {
    //   id: 12738971293,
    //   maSV: 234,
    //   hoTen: "Nguyễn Văn B",
    //   soDienThoai: 938111111,
    //   email: "nguyenvanb@gmail.com",
    // },
  ],
  selectedUser: null,
};

export const baiTapForm = (state = stateDefault, { type, payload }) => {
  switch (type) {
    case "ADD_USER": {
      const data = [...state.mangSinhVien];
      const user = { ...payload, id: Date.now() };
      data.push(user);
      return { ...state, mangSinhVien: data };
    }

    case "DELETE_USER": {
      const data = state.mangSinhVien.filter((sv) => sv.id !== payload);
      return { ...state, mangSinhVien: data };
    }

    case "EDIT_USER": {
      const sv = state.mangSinhVien.find((sv) => sv.id === payload);
      console.log("sv: ", sv);
      return { ...state, selectedUser: sv };
    }

    case "UPDATE_USER": {
      const newSVList = state.mangSinhVien.map((sv) =>
        sv.id === payload.id ? payload : sv
      );

      state.selectedUser = null;
      return { ...state, mangSinhVien: newSVList };
    }

    case "SEARCH_USER": {
      const searchSV = state.mangSinhVien.filter((sv) =>
        sv.maSV === payload.maSV ||
        sv.hoTen === payload.hoTen ||
        sv.soDienThoai === payload.soDienThoai ||
        sv.email === payload.email
          ? true
          : false
      );
      return { ...state, mangSinhVien: searchSV };
    }
    default:
      return state;
  }
};
