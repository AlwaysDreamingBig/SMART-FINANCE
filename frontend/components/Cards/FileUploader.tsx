interface FileUploadProps {
  label: string;
  onUpload: (files: File[]) => void;
  icon?: React.ReactNode;
}

export const FileUpload = ({ label, onUpload, icon }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onUpload(files);
    }
  };

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400">
        <label className="flex cursor-pointer items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span className="text-sm">Upload files</span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </label>
      </div>
    </div>
  );
};
