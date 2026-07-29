import { Box, Flex, Skeleton, Stack } from "@/components/primitives";
import styles from "./page.module.scss";

export default function Loading() {
  return (
    <div className={styles.page}>
      <Stack gap={6}>
        <Skeleton width={190} height={40} />

        <Flex className={styles.header} gap={6}>
          <Box className={styles.avatarContainer}>
            <Skeleton width="100%" height="100%" radius="lg" />
          </Box>

          <Stack gap={4} className={styles.headerContent}>
            <Skeleton width="60%" height={40} />
            <Skeleton width={170} height={40} />

            <Stack gap={3}>
              {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={index} height={20} />
              ))}
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </div>
  );
}
