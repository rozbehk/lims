export function  timeFormat(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" ,hour: 'numeric',  minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }