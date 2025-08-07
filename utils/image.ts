import { writeFile } from "fs/promises";
import path from "path";

import { supabase } from '@/lib/supabase';

export async function saveImage(file: File): Promise<string | null> {
const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === 'true';
  
  if (useSupabase) {
    return await saveImageToSupabase(file);
  } else {
    return await saveImageToLocal(file);
  }
}

export async function saveImageToLocal(file: File) {
 const buffer = Buffer.from(await file.arrayBuffer()) // バイナリーデータをBufferに変換
 console.log('file.name:', file.name);
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

async function saveImageToSupabase(file: File): Promise<string | null> {
  const fileName = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from('udemy-next-blog-bucket').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) {
    console.error('Upload error:', error.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage.from('udemy-next-blog-bucket').getPublicUrl(fileName);
  return publicUrlData.publicUrl; 
}