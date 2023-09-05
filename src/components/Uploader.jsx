import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Uploader() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Create an array of file objects with additional data for order and key
    const newFiles = acceptedFiles.map((file, index) => ({
      file,
      order: index,
      key: Date.now() + index,
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop,
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(uploadedFiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order property for each item
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setUploadedFiles(updatedItems);
  };

  return (
    <div className="white-box p-6 bg-white shadow-md rounded-lg">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p className="text-gray-400 text-lg">Drag & drop PDF files here, or click to select files</p>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`file-list-${Math.random()}`}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {uploadedFiles.map((item, index) => (
                <Draggable key={item.key} draggableId={item.key.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-gray-200 p-4 mt-4 rounded-md"
                    >
                      <div className="flex justify-between items-center">
                        <span>{item.file.name}</span>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            // Remove the file from the list
                            const updatedFiles = uploadedFiles.filter(
                              (file) => file.key !== item.key
                            );
                            setUploadedFiles(updatedFiles);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
