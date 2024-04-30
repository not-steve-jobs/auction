class UsersDto {
  static formatUserToJson(user) {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      picture: user.picture,
      role: user.role,
      status: user.status,
      created_at: user.created_at
    };
  }

  static formatPwdToJson(user) {
    return { password: user.password };
  }
}

export default UsersDto;
