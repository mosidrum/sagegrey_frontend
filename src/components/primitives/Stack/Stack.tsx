import { Flex, type FlexProps } from "../Flex/Flex";

export type StackProps = FlexProps;

export function Stack({ direction = "column", ...rest }: StackProps) {
  return <Flex direction={direction} {...rest} />;
}
