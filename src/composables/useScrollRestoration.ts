import { nextTick, onActivated, onDeactivated, onUnmounted, ref, watch, type Ref } from "vue";

/**
 * KeepAlive된 컴포넌트 내의 스크롤 위치를 저장하고 복원하는 Composable
 * @param elementRef 스크롤 컨테이너의 Ref
 */
export function useScrollRestoration(elementRef: Ref<HTMLElement | null>) {
  const savedScrollTop = ref(0);
  const savedScrollLeft = ref(0);
  const isActive = ref(false);
  const isRestored = ref(false); // 스크롤이 한 번 성공적으로 복원되었는지 여부
  let resizeObserver: ResizeObserver | null = null;

  const restoreScroll = () => {
    if (elementRef.value && !isRestored.value) {
      // 스크롤 가능한 높이가 충분할 때만 복원 시도
      if (elementRef.value.scrollHeight > elementRef.value.clientHeight) {
        elementRef.value.scrollTop = savedScrollTop.value;
        elementRef.value.scrollLeft = savedScrollLeft.value;

        // 복원된 위치가 의도한 위치와 비슷하다면 복원 완료 처리 (오차 허용)
        if (Math.abs(elementRef.value.scrollTop - savedScrollTop.value) < 5) {
          isRestored.value = true;
        }
      }
    }
  };

  const initObserver = () => {
    if (elementRef.value && !resizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        if (isActive.value && !isRestored.value) {
          restoreScroll();
        }
      });
      resizeObserver.observe(elementRef.value);
    }
  };

  const cleanupObserver = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  };

  // 스크롤 이벤트 발생 시 실시간으로 위치 저장
  const onScroll = () => {
    if (isActive.value && elementRef.value) {
      // 이미 숨겨진 상태라면 무시
      if (elementRef.value.offsetParent === null || elementRef.value.clientHeight === 0) return;

      savedScrollTop.value = elementRef.value.scrollTop;
      savedScrollLeft.value = elementRef.value.scrollLeft;
    }
  };

  // 리스너 부착/해제 관리
  const attachListener = () => {
    if (elementRef.value) {
      elementRef.value.removeEventListener("scroll", onScroll); // 중복 방지
      elementRef.value.addEventListener("scroll", onScroll);
    }
  };

  const detachListener = () => {
    if (elementRef.value) {
      elementRef.value.removeEventListener("scroll", onScroll);
    }
  };

  watch(
    elementRef,
    (el) => {
      if (el) {
        attachListener();
        if (isActive.value) {
          initObserver();
          restoreScroll();
        }
      }
    },
    { immediate: true },
  );

  onActivated(async () => {
    isRestored.value = false; // 진입 시 복원 대기 상태로 초기화
    await nextTick();

    isActive.value = true; // 화면 렌더링이 안정화된 후 스크롤 저장 활성화

    // 활성화 시점에 리스너 재부착 (DOM이 재생성되었을 가능성 대비)
    attachListener();
    initObserver();
    restoreScroll();

    // Double check after a short delay
    setTimeout(() => {
      if (isActive.value && !isRestored.value) {
        restoreScroll();
      }
    }, 100);
  });

  onDeactivated(() => {
    isActive.value = false;
    cleanupObserver();
    // detachListener(); // KeepAlive 상태에서도 리스너는 유지 (활성화 시 재부착하므로 안전)
  });

  onUnmounted(() => {
    cleanupObserver();
    detachListener();
  });
}
