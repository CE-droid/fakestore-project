"use client";

import { Input, Textarea, Button, VStack, Text, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  FileUpload,
  Float,
  useFileUploadContext,
} from "@chakra-ui/react";
import { LuFileImage, LuX } from "react-icons/lu";

const FileUploadList = () => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  
  if (files.length === 0) return null;
  
  return (
    <FileUpload.ItemGroup mt={2}>
      {files.map((file) => (
        <FileUpload.Item
          w="auto"
          boxSize="20"
          p="2"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

export default function ProductForm({ product, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: product || {
      title: "",
      price: "",
      description: "",
      category: "",
      image: null, 
    },
  });

  // Watch the image field to handle file changes
  const imageFile = watch("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <div>
          <label>Product Title</label>
          <Input
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <Text color="red.500">{errors.title.message}</Text>}
        </div>

        <div>
          <label>Price</label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
              valueAsNumber: true,
            })}
          />
          {errors.price && <Text color="red.500">{errors.price.message}</Text>}
        </div>

        <div>
          <label>Category</label>
          <Input
            id="category"
            type="text"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && (
            <Text color="red.500">{errors.category.message}</Text>
          )}
        </div>

        <div>
          <label>Product Image</label>
          <FileUpload.Root
            accept="image/*"
            onFileAccept={(files) => {
              setValue("image", files[0]); // Set the first file as the image
            }}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <Button variant="outline" size="sm" leftIcon={<LuFileImage />}>
                {imageFile ? "Change Image" : "Upload Image"}
              </Button>
            </FileUpload.Trigger>
            {imageFile && (
              <Text mt={2} fontSize="sm">
                Selected: {imageFile.name}
              </Text>
            )}
            <FileUploadList />
          </FileUpload.Root>
          {errors.image && <Text color="red.500">{errors.image.message}</Text>}
        </div>

        <div>
          <label>Description</label>
          <Textarea
            id="description"
            rows={4}
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && (
            <Text color="red.500">{errors.description.message}</Text>
          )}
        </div>

        <Button
          type="submit"
          colorScheme="blue"
         
          loadingText="Saving..."
          loading={isSubmitting}
          spinnerPlacement="end"
          mt={4}
        >
          Save Product
        </Button>
      </VStack>
    </form>
  );
}