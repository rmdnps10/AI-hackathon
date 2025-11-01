import { useRef } from "react";
import type { ChangeEvent } from "react";
import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Text } from "@chakra-ui/react/text";

type ResourceUploadTileProps = {
  onFilesSelected: (files: FileList) => void;
};

function ResourceUploadTile({ onFilesSelected }: ResourceUploadTileProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
      event.target.value = "";
    }
  };

  return (
    <Box
      border="1px dashed"
      borderColor="#d4d4d8"
      borderRadius="12px"
      p="16px"
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="12px"
      minH="120px"
      textAlign="center"
    >
      <Text fontSize="sm" color="gray.600">
        자료 업로드 하기
      </Text>
      <Button size="sm" onClick={handleClick} bg={"black"}>
        파일 선택
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={handleChange}
      />
    </Box>
  );
}

export default ResourceUploadTile;
