(() => {
    "use strict";

    /**
     * 개인정보처리방침의 공통 날짜 정보입니다.
     * 실제 게시 전에 각 값을 YYYY-MM-DD 형식으로 변경해야 합니다.
     *
     * @type {{effectiveDate: string, lastUpdated: string}}
     */
    const policyMeta = Object.freeze({
        effectiveDate: "2026-08-16",
        lastUpdated: "2026-08-16"
    });

    /**
     * 값이 YYYY-MM-DD 형식의 유효한 날짜인지 확인합니다.
     *
     * @param {string} value 확인할 날짜 문자열입니다.
     * @returns {boolean} 유효한 ISO 날짜이면 true를 반환합니다.
     */
    function isValidIsoDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return false;
        }

        const date = new Date(`${value}T00:00:00Z`);
        return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
    }

    /**
     * 문서 언어에 맞는 날짜 미설정 안내 문구를 반환합니다.
     *
     * @returns {string} 한국어 또는 영문 안내 문구입니다.
     */
    function getRequiredDateText() {
        return document.documentElement.lang === "en"
            ? "[REQUIRED: YYYY-MM-DD]"
            : "[필수 입력: YYYY-MM-DD]";
    }

    /**
     * 지정한 선택자에 해당하는 모든 time 요소에 공통 날짜를 반영합니다.
     * 유효하지 않은 날짜는 datetime 속성을 제거하고 필수 입력 상태로 표시합니다.
     *
     * @param {string} selector 날짜를 표시할 요소의 선택자입니다.
     * @param {string} value 적용할 날짜 문자열입니다.
     * @returns {void}
     */
    function applyPolicyDate(selector, value) {
        const isValid = isValidIsoDate(value);
        const elements = document.querySelectorAll(selector);

        for (const element of elements) {
            element.textContent = isValid ? value : getRequiredDateText();
            element.classList.toggle("required", !isValid);

            if (isValid) {
                element.dateTime = value;
            } else {
                element.removeAttribute("datetime");
            }
        }
    }

    /**
     * 공통 메타데이터를 현재 개인정보처리방침 문서에 반영합니다.
     *
     * @returns {void}
     */
    function initializePolicyMeta() {
        applyPolicyDate("[data-policy-effective-date]", policyMeta.effectiveDate);
        applyPolicyDate("[data-policy-last-updated]", policyMeta.lastUpdated);
    }

    initializePolicyMeta();
})();
