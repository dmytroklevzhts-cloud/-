/**
 * Спільні утиліти для роботи з DOM та анімаціями (DOM & Helper Utilities)
 * Дніпровський політехнічний фаховий коледж — 122 «Комп'ютерні науки»
 */

/**
 * Вибірка одного елемента
 * @param {string} selector 
 * @param {ParentNode} [context=document] 
 * @returns {Element|null}
 */
export function $(selector, context = document) {
    return context.querySelector(selector);
}

/**
 * Вибірка списку елементів у вигляді звичайного масиву
 * @param {string} selector 
 * @param {ParentNode} [context=document] 
 * @returns {Element[]}
 */
export function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

/**
 * Зручне додавання обробника подій з підтримкою делегування
 * @param {EventTarget} target 
 * @param {string} event 
 * @param {Function} handler 
 * @param {boolean|AddEventListenerOptions} [options=false] 
 */
export function on(target, event, handler, options = false) {
    if (!target) return;
    target.addEventListener(event, handler, options);
}

/**
 * Обмеження значення в діапазоні [min, max]
 * @param {number} val 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

/**
 * Лінійна інтерполяція (Lerp)
 * @param {number} start 
 * @param {number} end 
 * @param {number} t 
 * @returns {number}
 */
export function lerp(start, end, t) {
    return start + (end - start) * t;
}

/**
 * Плавне кубічне гальмування (ease-out cubic)
 * @param {number} t (0..1)
 * @returns {number}
 */
export function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}
