export const validationTests = {
  required(value: unknown) {
    if (!value) {
      return 'Поле обязательно для заполнения'
    }
    return ''
  },

  equalPassword(password: string, passwordAgain: string) {
    if (password !== passwordAgain) {
      return 'Пароли должны совпадать'
    }
    return ''
  },

  validPassword(password: string) {
    const pattern = /^(?=[^А-Яа-я\s]{9,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=[^А-Яа-я\s]+\d|\d)((?=[^А-Яа-я\s]+[a-z]|[a-z]){1})((?=[^А-Яа-я\s]+[A-Z]|[A-Z]){1})[^А-Яа-я\s]+$/;
    if (!pattern.test(password)) {
      return 'Пароль должен соотвествовать формату'
    }
    return ''
  }
}