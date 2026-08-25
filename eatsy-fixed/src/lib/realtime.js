import { supabase } from './supabase';
export function subscribeToMenuStock(restaurantId,onChange){
 if(!supabase) return ()=>{};
 const channel=supabase.channel(`menu-stock-${restaurantId}`).on('postgres_changes',{event:'*',schema:'public',table:'menu_items',filter:`restaurant_id=eq.${restaurantId}`},payload=>onChange(payload)).subscribe();
 return ()=>supabase.removeChannel(channel);
}
