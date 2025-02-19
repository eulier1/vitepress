// markdown-it plugin for normalizing image source

import MarkdownIt from 'markdown-it'
import { EXTERNAL_URL_RE } from '../../shared'

export const imagePlugin = (md: MarkdownIt) => {
  const imageRule = md.renderer.rules.image!
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const url = token.attrGet('src')
    if (url && !EXTERNAL_URL_RE.test(url) && !/^\.?\//.test(url)) {
      token.attrSet('src', './' + url)
    }
    return imageRule(tokens, idx, options, env, self)
  }
}
