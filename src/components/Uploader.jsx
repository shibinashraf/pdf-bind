import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Uploader({ onUpload }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file, index) => ({
      file,
      order: uploadedFiles.length + index,
      key: Date.now() + index,
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    onUpload([...uploadedFiles, ...newFiles]);
  }, [onUpload, uploadedFiles]);

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

    setUploadedFiles(updatedItems); // Update the state with the new order

    onUpload(updatedItems); // Call onUpload with the updated order
  };

  const handleTouchStart = (e, item) => {
    e.preventDefault();
  };

  return (
    <div className="white-box p-6 bg-white  rounded-lg">
      <div {...getRootProps()} className="border-2 md:h-[20rem] flex items-center justify-center border-dashed rounded-lg border-gray-300 p-6  text-center cursor-pointer ">
        <input {...getInputProps()} />
        <div className="text-gray-400  text-lg">Drag & drop PDF files here, or click to select files</div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`file-list-${Math.random()}`}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              onTouchStart={(e) => handleTouchStart(e)}
            >
              {uploadedFiles.map((item, index) => (
                <Draggable
                  key={item.key}
                  draggableId={item.key.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onTouchStart={(e) => handleTouchStart(e, item)}
                      className="bg-gray-200 p-4 mt-4 rounded-md"
                    >
                      <div className="flex justify-between items-center ">
                        <span>{item.file.name}</span>
                        <button
                          className="text-red-600 ml-2 hover:text-red-800 font-bold"
                          onClick={() => {
                            const updatedFiles = uploadedFiles.filter(
                              (file) => file.key !== item.key
                            );
                            setUploadedFiles(updatedFiles);
                            onUpload(updatedFiles); // Update onUpload with the new state
                          }}
                        >
                          &#x2715;
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
