import { describe, expect, it } from 'vitest'
import { compileTw, minifyTw } from '.'
import dedent from 'dedent'

describe('compiling CSS from RAW HTML input', () => {
  it('can build styling', async () => {
    const result = await compileTw(
      dedent`
        <div class="text-lg bg-red-500">Lorem Ipsum</div>
      `,
    )
    
    expect(result).toContain(dedent`
      @layer utilities {
        .bg-red-500 {
          background-color: var(--color-red-500);
        }

        .text-lg {
          font-size: var(--text-lg);
          line-height: var(--tw-leading, var(--text-lg--line-height));
        }
      }
    `)
  })

  it('can optimize styling', async () => {
    const result = await minifyTw(
      dedent`
        <div class="text-lg bg-red-500">Lorem Ipsum</div>
      `,
    )

    expect(result).toContain(dedent`
      @layer utilities{.bg-red-500{background-color:var(--color-red-500)}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}}
    `)
  })
})
