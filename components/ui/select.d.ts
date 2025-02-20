declare module '@radix-ui/react-select' {
  interface SelectProps {
    multiple?: boolean;
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?(value: string | string[]): void;
  }
}