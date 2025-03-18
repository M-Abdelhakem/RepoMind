export interface Citation {
    file: string
    lines: string
  }
  
  export interface CodeBlock {
    language: string
    code: string
  }
  
  export interface Message {
    id: string
    role: "user" | "system"
    content: string
    citations?: Citation[]
    codeBlocks?: CodeBlock[]
  }