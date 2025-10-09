import {ChatOpenAI} from '@langchain/openai'
  import { StructuredOutputParser } from '@langchain/core/output_parsers'
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood:z.string().describe('the mood of the person who wrote the journal entry.'),
        summary: z.string().describe('quick summary of the entire entry.'),
        negative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
        color: z.string().describe('a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.')
    })
)

export const analyze = async(prompt)=>{
    // temperature describes the variance and randomness the outputs can be. high temp creative but higher chances of hallucination, low temp not creative but its more factual/real
const model = new ChatOpenAI({temperature:0, modelName:'gpt-3.5-turbo'})
const result = await model.invoke(prompt)
console.log(result)

}
