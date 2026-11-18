import type { Register } from 'claude-code'

const COMMAND = 'rsi'

const RSI_PROMPT =
  'Suggest an RSI (recursive self-improvement): review this session for corrections I made, ' +
  'repeated friction or workarounds that are likely to recur, and propose at most 3 rules ' +
  'that would prevent them. For each, give the exact wording and the file it belongs in ' +
  '(a CLAUDE.md or a memory file). Use the fewest words that keep the point, and merge into ' +
  'an existing bullet or section where one fits. Do not write any file in this reply: ask me ' +
  'which to apply, with buttons if you can, then apply only the ones I pick. ' +
  'If nothing is worth a rule, say so.'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: COMMAND,
      description: 'Suggest RSI: propose up to 3 rules from this session',
    })

    return next(e)
  })

  on('command.run', { command: COMMAND }, async $ => {
    const sent = await $.prompt.submit({ text: RSI_PROMPT, asUser: true })

    if (sent.drop) {
      return { text: 'The RSI review prompt was blocked by a hook.', isTextDisplayOnly: true }
    }

    return { text: 'Asked for an RSI review.', isTextDisplayOnly: true }
  }).catch(() => ({
    text: 'Could not start the RSI review; press Suggest RSI instead.',
    isTextDisplayOnly: true,
  }))

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey || e.props.isWorking) {
      return next(e)
    }

    const { Box, Button } = $.ui.resolve(e)

    return (
      <Box>
        <Button
          key="rsi"
          label="Suggest RSI"
          onPress={() => void $.prompt.submit({ text: RSI_PROMPT, asUser: true })}
        />
      </Box>
    )
  })
}
