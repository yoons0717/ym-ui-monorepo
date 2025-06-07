import {clsx, type ClassValue} from "clsx";

/**
 * className을 조합하는 유틸리티 함수
 * clsx를 기반으로 하며, 조건부 클래스네임을 쉽게 관리할 수 있습니다.
 *
 * @param inputs - 클래스네임들 (문자열, 객체, 배열 등)
 * @returns 조합된 클래스네임 문자열
 *
 * @example
 * cn('btn', 'btn-primary') // 'btn btn-primary'
 * cn('btn', { 'btn-active': isActive }) // 'btn btn-active' (isActive가 true일 때)
 * cn(['btn', 'btn-large'], undefined, 'extra-class') // 'btn btn-large extra-class'
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
