declare namespace NodeJS {
  interface ProcessEnv {
    
  }
}

declare module '*.scss' {
	const content: Record<string, string>;
	export default content;
}

interface Window{
	app: HTMLDivElement
}