import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// تهيئة عميل Supabase
// في بيئة الإنتاج، يجب وضع هذه المتغيرات في ملفات البيئة (.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// واجهات البيانات
export interface Link {
  id: string;
  user_id: string;
  title: string;
  original_url: string;
  short_code: string;
  description?: string | null;
  tags?: string[] | null;
  expires_at?: string | null;
  is_password_protected: boolean;
  is_geo_targeted: boolean;
  is_device_targeted: boolean;
  is_one_time_use: boolean;
  status: 'active' | 'expired' | 'scheduled';
  button_style?: any | null;
  payment_settings?: any | null;
  clicks: number;
  created_at: string;
  updated_at: string;
  order?: number | null;
}

export interface LinkImage {
  id: string;
  link_id: string;
  url: string;
  type: 'thumbnail' | 'background' | 'favicon';
  created_at: string;
}

// تحويل نوع البيانات من Supabase إلى النوع المستخدم في التطبيق
const mapDbLinkToLink = (dbLink: Database['public']['Tables']['links']['Row']): Link => {
  return {
    id: dbLink.id,
    user_id: dbLink.user_id,
    title: dbLink.title,
    original_url: dbLink.original_url,
    short_code: dbLink.short_code,
    description: dbLink.description,
    tags: dbLink.tags,
    expires_at: dbLink.expires_at,
    is_password_protected: dbLink.is_password_protected,
    is_geo_targeted: dbLink.is_geo_targeted,
    is_device_targeted: dbLink.is_device_targeted,
    is_one_time_use: dbLink.is_one_time_use,
    status: dbLink.status as 'active' | 'expired' | 'scheduled',
    button_style: dbLink.button_style,
    payment_settings: dbLink.payment_settings,
    clicks: dbLink.clicks,
    created_at: dbLink.created_at,
    updated_at: dbLink.updated_at,
    order: dbLink.order
  };
};

const mapDbLinkImageToLinkImage = (dbImage: Database['public']['Tables']['link_images']['Row']): LinkImage => {
  return {
    ...dbImage,
    type: dbImage.type as 'thumbnail' | 'background' | 'favicon',
  };
};

export interface LinkClick {
  id: string;
  link_id: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  created_at: string;
}

// دوال للتعامل مع الروابط
export const linkService = {
  // جلب جميع الروابط للمستخدم الحالي
  async getLinks(userId: string): Promise<Link[]> {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', userId)
      .order('order', { ascending: true });
    
    if (error) {
      console.error('Error fetching links:', error);
      return [];
    }
    
    return (data || []).map(mapDbLinkToLink);
  },
  
  // جلب رابط محدد
  async getLink(linkId: string): Promise<Link | null> {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('id', linkId)
      .single();
    
    if (error) {
      console.error('Error fetching link:', error);
      return null;
    }
    
    return data ? mapDbLinkToLink(data) : null;
  },
  
  // إنشاء رابط جديد
  async createLink(link: Omit<Link, 'id' | 'created_at' | 'updated_at' | 'clicks'>): Promise<Link | null> {
    const { data, error } = await supabase
      .from('links')
      .insert([
        { 
          ...link,
          clicks: 0,
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating link:', error);
      return null;
    }
    
    return data ? mapDbLinkToLink(data) : null;
  },
  
  // تحديث رابط موجود
  async updateLink(linkId: string, updates: Partial<Link>): Promise<Link | null> {
    const { data, error } = await supabase
      .from('links')
      .update(updates)
      .eq('id', linkId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating link:', error);
      return null;
    }
    
    return data ? mapDbLinkToLink(data) : null;
  },
  
  // حذف رابط
  async deleteLink(linkId: string): Promise<boolean> {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', linkId);
    
    if (error) {
      console.error('Error deleting link:', error);
      return false;
    }
    
    return true;
  },
  
  // تحديث ترتيب الروابط
  async updateLinksOrder(links: { id: string; order: number }[]): Promise<boolean> {
    // استخدام المعاملات لتحديث جميع الروابط في عملية واحدة
    const updates = links.map(link => ({
      id: link.id,
      order: link.order,
    }));
    
    const { error } = await supabase.rpc('update_links_order', { links_data: updates });
    
    if (error) {
      console.error('Error updating links order:', error);
      return false;
    }
    
    return true;
  },
  
  // زيادة عدد النقرات
  async incrementClicks(linkId: string): Promise<boolean> {
    const { error } = await supabase.rpc('increment_link_clicks', { link_id: linkId });
    
    if (error) {
      console.error('Error incrementing clicks:', error);
      return false;
    }
    
    return true;
  },
  
  // تسجيل نقرة جديدة مع البيانات
  async recordClick(linkId: string, clickData: Partial<LinkClick>): Promise<boolean> {
    const { error } = await supabase
      .from('link_clicks')
      .insert([
        { 
          link_id: linkId,
          ...clickData,
        }
      ]);
    
    if (error) {
      console.error('Error recording click:', error);
      return false;
    }
    
    return true;
  },
};

// دوال للتعامل مع صور الروابط
export const linkImageService = {
  // رفع صورة جديدة
  async uploadImage(file: File, linkId: string, type: LinkImage['type']): Promise<LinkImage | null> {
    // 1. رفع الملف إلى تخزين Supabase
    const fileName = `${linkId}/${type}_${Date.now()}`;
    const fileExt = file.name.split('.').pop();
    const filePath = `${fileName}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('link_images')
      .upload(filePath, file);
    
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }
    
    // 2. الحصول على URL العام للملف
    const { data: urlData } = await supabase
      .storage
      .from('link_images')
      .getPublicUrl(filePath);
    
    if (!urlData.publicUrl) {
      console.error('Error getting public URL');
      return null;
    }
    
    // 3. إنشاء سجل في جدول link_images
    const { data: imageData, error: imageError } = await supabase
      .from('link_images')
      .insert([
        { 
          link_id: linkId,
          url: urlData.publicUrl,
          type,
        }
      ])
      .select()
      .single();
    
    if (imageError) {
      console.error('Error creating image record:', imageError);
      return null;
    }
    
    return imageData ? mapDbLinkImageToLinkImage(imageData) : null;
  },
  
  // حذف صورة
  async deleteImage(imageId: string): Promise<boolean> {
    // 1. الحصول على معلومات الصورة
    const { data: image, error: fetchError } = await supabase
      .from('link_images')
      .select('*')
      .eq('id', imageId)
      .single();
    
    if (fetchError || !image) {
      console.error('Error fetching image:', fetchError);
      return false;
    }
    
    // 2. استخراج مسار الملف من URL
    const url = new URL(image.url);
    const pathParts = url.pathname.split('/');
    const filePath = pathParts[pathParts.length - 1];
    
    // 3. حذف الملف من التخزين
    const { error: storageError } = await supabase
      .storage
      .from('link_images')
      .remove([filePath]);
    
    if (storageError) {
      console.error('Error deleting image from storage:', storageError);
      return false;
    }
    
    // 4. حذف السجل من قاعدة البيانات
    const { error: dbError } = await supabase
      .from('link_images')
      .delete()
      .eq('id', imageId);
    
    if (dbError) {
      console.error('Error deleting image record:', dbError);
      return false;
    }
    
    return true;
  },
  
  // الحصول على صور الرابط
  async getLinkImages(linkId: string): Promise<LinkImage[]> {
    const { data, error } = await supabase
      .from('link_images')
      .select('*')
      .eq('link_id', linkId);
    
    if (error) {
      console.error('Error fetching link images:', error);
      return [];
    }
    
    return (data || []).map(mapDbLinkImageToLinkImage);
  },
};

// دوال للتعامل مع تحليلات النقرات
export const analyticsService = {
  // الحصول على إحصائيات النقرات حسب الفترة الزمنية
  async getClicksByTimeRange(linkId: string, startDate: string, endDate: string): Promise<any[]> {
    const { data, error } = await supabase.rpc('get_clicks_by_date_range', {
      link_id: linkId,
      start_date: startDate,
      end_date: endDate
    });
    
    if (error) {
      console.error('Error fetching clicks by time range:', error);
      return [];
    }
    
    return data || [];
  },
  
  // الحصول على إحصائيات النقرات حسب البلد
  async getClicksByCountry(linkId: string): Promise<any[]> {
    const { data, error } = await supabase.rpc('get_clicks_by_country', {
      link_id: linkId
    });
    
    if (error) {
      console.error('Error fetching clicks by country:', error);
      return [];
    }
    
    return data || [];
  },
  
  // الحصول على إحصائيات النقرات حسب نوع الجهاز
  async getClicksByDevice(linkId: string): Promise<any[]> {
    const { data, error } = await supabase.rpc('get_clicks_by_device', {
      link_id: linkId
    });
    
    if (error) {
      console.error('Error fetching clicks by device:', error);
      return [];
    }
    
    return data || [];
  },
  
  // الحصول على إحصائيات النقرات حسب المتصفح
  async getClicksByBrowser(linkId: string): Promise<any[]> {
    const { data, error } = await supabase.rpc('get_clicks_by_browser', {
      link_id: linkId
    });
    
    if (error) {
      console.error('Error fetching clicks by browser:', error);
      return [];
    }
    
    return data || [];
  },
};

// دوال للتعامل مع المستخدمين
export const userService = {
  // تسجيل الدخول
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Error logging in:', error);
      throw error;
    }
    
    return data;
  },
  
  // تسجيل الخروج
  async logout() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error logging out:', error);
      throw error;
    }
    
    return true;
  },
  
  // إنشاء حساب جديد
  async signup(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      console.error('Error signing up:', error);
      throw error;
    }
    
    return data;
  },
  
  // الحصول على المستخدم الحالي
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }
    
    return data?.user || null;
  },
};

export default supabase;
