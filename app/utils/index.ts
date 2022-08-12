/* eslint-disable import/prefer-default-export */
import i18n from '../services/i18n';

/**
 * Alias for i18n.t: get translation string
 * @param {i18n.Scope} scope translation key
 * @param {i18n.TranslateOptions | undefined} options translation options
 * @returns {string} translated string
 */
export function t(
  scope: i18n.Scope,
  options?: i18n.TranslateOptions | undefined,
): string {
  return i18n.t(scope, options);
}
