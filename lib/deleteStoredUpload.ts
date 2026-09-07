import connectToDatabase from "@/lib/mongodb";
import StoredUpload, { UploadFolder } from "@/models/StoredUpload";

export async function deleteStoredUpload(folder: UploadFolder, filename: string) {
  await connectToDatabase();
  return StoredUpload.deleteOne({ folder, filename });
}

export default deleteStoredUpload;
