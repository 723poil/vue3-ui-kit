// 유효성 검사 규칙 타입 정의
export type ValidationRule<T = any> = (value: T) => string | boolean;

// 필수 입력
export const required = (message = "필수 입력 항목입니다.") => {
  return (value: any) => {
    if (value === null || value === undefined || value === "") return message;
    if (Array.isArray(value) && value.length === 0) return message;
    return true;
  };
};

// 최소 길이
export const minLength = (min: number, message = `최소 ${min}자 이상 입력해주세요.`) => {
  return (value: string) => {
    if (!value) return true; // 값이 없으면 required에서 처리
    return value.length >= min || message;
  };
};

// 최대 길이
export const maxLength = (max: number, message = `최대 ${max}자까지 입력 가능합니다.`) => {
  return (value: string) => {
    if (!value) return true;
    return value.length <= max || message;
  };
};

// 정확한 길이
export const exactLength = (length: number, message = `${length}자를 입력해야 합니다.`) => {
  return (value: string) => {
    if (!value) return true;
    return value.length === length || message;
  };
};

// 이메일 형식
export const email = (message = "올바른 이메일 형식이 아닙니다.") => {
  // 간단한 이메일 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (value: string) => {
    if (!value) return true;
    return emailRegex.test(value) || message;
  };
};

// 숫자만 허용
export const numeric = (message = "숫자만 입력해주세요.") => {
  const numRegex = /^[0-9]+$/;
  return (value: string) => {
    if (!value) return true;
    return numRegex.test(value) || message;
  };
};

// 패턴 검사 (커스텀 정규식)
export const pattern = (regex: RegExp, message = "형식이 올바르지 않습니다.") => {
  return (value: string) => {
    if (!value) return true;
    return regex.test(value) || message;
  };
};

// 위도 검사 (-90 ~ 90)
export const gpsLat = (message = "유효하지 않은 위도 값입니다.") => {
  return (value: number | string) => {
    if (!value) return true;
    const num = Number(value);
    return (!isNaN(num) && num >= -90 && num <= 90) || message;
  };
};

// 경도 검사 (-180 ~ 180)
export const gpsLng = (message = "유효하지 않은 경도 값입니다.") => {
  return (value: number | string) => {
    if (!value) return true;
    const num = Number(value);
    return (!isNaN(num) && num >= -180 && num <= 180) || message;
  };
};

// 최소값
export const minValue = (min: number, message = `최소 ${min} 이상이어야 합니다.`) => {
  return (value: number | string) => {
    if (value === null || value === undefined || value === "") return true;
    const num = Number(value);
    return (!isNaN(num) && num >= min) || message;
  };
};

// 최대값
export const maxValue = (max: number, message = `최대 ${max} 이하이어야 합니다.`) => {
  return (value: number | string) => {
    if (value === null || value === undefined || value === "") return true;
    const num = Number(value);
    return (!isNaN(num) && num <= max) || message;
  };
};
