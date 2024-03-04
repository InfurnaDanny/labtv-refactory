export const REGEX_PASSWORD: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@£€$'!~,;:_^=?*+#.&§%°(){}|[/]{8,}$/;
export const REGEX_EMAIL: RegExp = /^[\-\w\.]+@([\-\w]+\.)+[\-\w]{2,4}$/;
export const REGEX_USERNAME = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$/;