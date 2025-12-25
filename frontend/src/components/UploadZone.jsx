import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const UploadZone = ({ onFileSelect }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        // Simple validation
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            alert('Please upload an image or video file.');
            return;
        }
        setSelectedFile(file);
        onFileSelect(file);
    };

    const clearFile = (e) => {
        e.stopPropagation();
        setSelectedFile(null);
        onFileSelect(null);
    };

    return (
        <div
            className={cn(
                "relative w-full max-w-2xl mx-auto h-64 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group",
                isDragging ? "border-primary bg-primary/10 scale-[1.02]" : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50",
                selectedFile ? "border-success/50 bg-success/5" : ""
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
        >
            <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileInput}
            />

            {selectedFile ? (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="relative">
                        {selectedFile.type.startsWith('image/') ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Preview"
                                className="h-32 w-32 object-cover rounded-lg shadow-lg border border-zinc-700"
                            />
                        ) : (
                            <div className="h-32 w-32 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-700">
                                <File className="w-12 h-12 text-zinc-400" />
                            </div>
                        )}
                        <button
                            onClick={clearFile}
                            className="absolute -top-2 -right-2 bg-danger text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                        >
                            <X size={14} />
                        </button>
                    </div>
                    <p className="mt-4 text-zinc-300 font-medium">{selectedFile.name}</p>
                    <p className="text-zinc-500 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
            ) : (
                <>
                    <div className="p-4 rounded-full bg-zinc-800/80 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-8 h-8 text-zinc-400 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-lg font-medium text-zinc-300">
                        Drag & drop or click to upload
                    </p>
                    <p className="text-zinc-500 mt-2 text-sm">
                        Supports Images (JPG, PNG, WEBP) and Videos (MP4)
                    </p>
                </>
            )}
        </div>
    );
};

export default UploadZone;
