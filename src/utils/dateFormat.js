class DateFormat {

  static convert(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = this.zeroFill(date.getMonth() + 1);
    const day = this.zeroFill(date.getDate());
    const hour = this.zeroFill(date.getHours());
    const minute = this.zeroFill(date.getMinutes());
    const second = this.zeroFill(date.getSeconds());

    return { year, month, day, hour, minute, second };
  }

  static zeroFill(number) {
    return number < 10 ? '0' + number : number;
  }
}

export default DateFormat;