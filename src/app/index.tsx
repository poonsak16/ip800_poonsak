import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// 1. เพิ่มโครงสร้างข้อมูลเพื่อให้ TypeScript รู้จักรูปแบบของสินค้า
interface Product {
  id: string;
  name: string;
  stock: number;
  category: string;
  location: string;
  status: string;
  imageUrl: string;
}

// เปลี่ยนตรงนี้เป็นลิงก์ Raw GitHub URL ของคุณเอง
const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/poonsak16/ip800_poonsak/refs/heads/main/product.json';

export default function ProductsScreen() {
  // 2. ใส่ <Product[]> เพื่อบอก TypeScript ว่าตัวแปรนี้จะมีข้อมูลหน้าตาตามที่เรากำหนดไว้
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(GITHUB_JSON_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />

      {/* --- ส่วนหัวแอป (Product Header) --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* --- ส่วนค้นหาและฟิลเตอร์ --- */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#93c5fd"
            editable={false}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter ▼</Text>
        </TouchableOpacity>
      </View>

      {/* --- ส่วนแสดงรายการสินค้า (Products List) --- */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e3a8a" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : (
        <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productInfo}>
                {/* รูปภาพสินค้า */}
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>
                
                {/* รายละเอียดจำนวน/คลังสินค้า */}
                <View style={styles.productDetails}>
                  <Text style={styles.stockText}>Stock: {product.stock} in stock</Text>
                  <Text style={styles.categoryText}>Category: {product.category}</Text>
                  <Text style={styles.locationText}>Location: {product.location}</Text>
                </View>
                
                {/* ปุ่มสถานะด้านขวา */}
                <View style={styles.productActions}>
                  <TouchableOpacity style={styles.statusButton}>
                    <Text style={styles.statusText}>{product.status}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.moreButton}>
                    <Text style={styles.moreIcon}>›</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* ชื่อสินค้าด้านล่างการ์ด */}
              <Text style={styles.productName}>{product.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* --- แถบเมนูด้านล่าง (Bottom Navigation) --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>+</Text>
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🖱️</Text>
          <Text style={[styles.navText, { color: '#1e3a8a', fontWeight: 'bold' }]}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📂</Text>
          <Text style={styles.navText}>Categories</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1e3a8a', 
    borderBottomWidth: 1,
    borderBottomColor: '#1d4ed8',
  },
  menuButton: {
    width: 38,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 18,
    color: '#93c5fd', 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff', 
  },
  profileButton: {
    width: 30,
    height: 30,
    backgroundColor: '#60a5fa', 
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 16,
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1e3a8a', 
    borderBottomWidth: 1,
    borderBottomColor: '#1d4ed8',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172554', 
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIcon: {
    fontSize: 16,
    color: '#60a5fa',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 14,
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#60a5fa', 
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filterText: {
    color: '#93c5fd',
    fontSize: 14,
    fontWeight: '600',
  },
  productsList: {
    flex: 1,
    padding: 20,
  },
  productCard: {
    backgroundColor: '#ffffff', 
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageWrapper: {
    width: 75,
    height: 75,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '90%',
    height: '90%',
  },
  productDetails: {
    flex: 1,
    marginLeft: 15,
  },
  stockText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#475569',
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusButton: {
    backgroundColor: '#dbeafe', 
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  statusText: {
    color: '#1e40af', 
    fontSize: 12,
    fontWeight: '700',
  },
  moreButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    fontSize: 20,
    color: '#1e3a8a',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a', 
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff', 
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#64748b',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#1e3a8a',
    fontSize: 14,
  },
});