import { computed, reactive, watch } from "vue";
import type { ValidationRule } from "../utils/validators/rules";

type Rules<T> = Partial<Record<keyof T, ValidationRule[]>>;

/**
 * Vue 3 Composition API를 위한 폼 유효성 검사 훅
 * 폼 데이터와 유효성 검사 규칙을 기반으로 실시간 에러 상태를 관리하고,
 * 전체 폼 또는 특정 필드의 유효성을 검사합니다.
 *
 * @template T 폼 데이터 객체의 타입
 * @param {T} initialValues 폼 데이터의 초기 값 객체
 * @param {Rules<T>} [rules] 각 폼 필드에 적용할 유효성 검사 규칙 배열을 담은 객체
 * @returns {{
 *   form: T; // 반응형 폼 데이터 객체
 *   errors: Partial<Record<keyof T, string>>; // 각 필드의 에러 메시지를 담은 객체
 *   validate: () => boolean; // 전체 폼의 유효성을 검사하고 결과를 반환하는 함수
 *   validateField: (field: keyof T) => boolean; // 특정 필드의 유효성을 검사하고 결과를 반환하는 함수
 *   reset: () => void; // 폼 데이터를 초기 상태로 리셋하고 에러 메시지를 지우는 함수
 *   isValid: import("vue").ComputedRef<boolean>; // 폼 전체의 유효성 여부를 나타내는 계산된 속성
 * }} 폼 관리 및 유효성 검사에 필요한 반응형 속성 및 함수들
 *
 * @example
 * ```typescript
 * import { useForm, required, minLength, email } from '@/shared/lib/validation';
 *
 * const { form, errors, validate, reset, isValid } = useForm(
 *   {
 *     username: '',
 *     email: '',
 *     password: ''
 *   },
 *   {
 *     username: [required('사용자 이름을 입력해주세요.'), minLength(3, '최소 3자 이상 입력해주세요.')],
 *     email: [required('이메일을 입력해주세요.'), email('유효한 이메일 형식이 아닙니다.')],
 *     password: [required('비밀번호를 입력해주세요.'), minLength(6, '최소 6자 이상 입력해주세요.')]
 *   }
 * );
 *
 * const handleSubmit = () => {
 *   if (validate()) {
 *     console.log('폼 유효함:', form);
 *     // API 호출 등 로직
 *   } else {
 *     console.log('폼 유효하지 않음:', errors);
 *   }
 * };
 * ```
 */
export function useForm<T extends Record<string, any>>(initialValues: T, rules?: Rules<T>) {
  // 폼 데이터 (Reactive)
  const form = reactive<T>({ ...initialValues });

  // 에러 메시지 저장소 (Reactive)
  // 키는 form의 키와 같고, 값은 에러 메시지 문자열 (없으면 빈 문자열)
  const errors = reactive({}) as Partial<Record<keyof T, string>>;

  // 전체 폼이 유효한지 확인 (Computed)
  const isValid = computed(() => {
    return Object.keys(errors).every((key) => !errors[key as keyof T]);
  });

  // 단일 필드 검증 함수
  const validateField = (field: keyof T) => {
    if (!rules || !rules[field]) return true;

    const fieldRules = rules[field]!;
    const value = (form as any)[field];

    for (const rule of fieldRules) {
      const result = rule(value);
      if (typeof result === "string") {
        errors[field] = result;
        return false;
      }
    }

    // 에러 없음
    errors[field] = "";
    return true;
  };

  // 전체 폼 검증 함수
  const validate = () => {
    if (!rules) return true;

    let isFormValid = true;
    const fields = Object.keys(rules) as Array<keyof T>;

    for (const field of fields) {
      const isFieldValid = validateField(field);
      if (!isFieldValid) {
        isFormValid = false;
      }
    }

    return isFormValid;
  };

  // 리셋 함수
  const reset = (newValues?: Partial<T>) => {
    const valuesToUse = newValues || initialValues;
    Object.assign(form, valuesToUse);
    Object.keys(errors).forEach((key) => {
      errors[key as keyof T] = "";
    });
  };

  // (선택 사항) 값이 변경될 때마다 실시간 검증을 원하면 아래 watch를 활성화하거나
  // 개별 컴포넌트의 @input/update:modelValue 에서 validateField를 호출하면 됨.
  // 여기서는 'dirty' 상태 관리가 복잡해질 수 있으므로,
  // 사용자가 명시적으로 validateField를 호출하거나 validate()를 호출하는 방식을 권장하지만,
  // 편의를 위해 값이 변경되면 해당 필드만 검증하도록 설정.
  if (rules) {
    watch(
      form,
      (_newValues) => {
        // 변경된 필드 찾기는 복잡하므로, 일단 rules가 있는 모든 필드를 감시하는 방식보다는
        // 필요한 경우 validateField를 직접 호출하는 패턴이 더 깔끔함.
        // 하지만 "간편해야 한다"는 요구사항을 위해, 에러가 "이미 있는" 필드는 수정 시 즉시 재검증하여 에러를 지워주는 UX가 좋음.
        Object.keys(rules).forEach((key) => {
          const k = key as keyof T;
          if (errors[k]) {
            validateField(k);
          }
        });
      },
      { deep: true },
    );
  }

  return {
    form,
    errors,
    validate,
    validateField,
    reset,
    isValid,
  };
}
