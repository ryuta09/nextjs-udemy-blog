import { writeFile } from "fs/promises";
import path from "path";

export async function saveImage(file: File): Promise<string | null> {
  const buffer = Buffer.from(await file.arrayBuffer()) // バイナリーデータをBufferに変換
  const fileName = `${Date.now()}_${file.name}` 
  const uploadDir = path.join(process.cwd(), 'public/images') // 第一引数でこのプロジェクトからの相対パスとして指定。第二引数でディレクトリを指定

  try {
    const filePath = path.join(uploadDir, fileName) // ファイル名
    await writeFile(filePath, buffer) // 指定したパスに書き込む
    return `/images/${fileName}`
  } catch(error) {
    return null
  }
}