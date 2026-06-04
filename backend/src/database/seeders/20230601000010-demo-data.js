'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/**
 * Comprehensive Demo Data Seeder
 * Seeds: Users, Categories, Products, Customers, Sales, SaleItems
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    const Op = Sequelize.Op;

    // ─────────────────────────────────────────────
    // 1. USERS
    // ─────────────────────────────────────────────
    const adminPassword = await bcrypt.hash('admin123', 12);
    const teamPassword  = await bcrypt.hash('admin', 12);
    const cashPassword  = await bcrypt.hash('cash123', 12);

    const adminId    = uuidv4();
    const managerId  = uuidv4();
    const cashierId  = uuidv4();
    const staffId    = uuidv4();

    // Check if users already exist
    const [existingUsers] = await queryInterface.sequelize.query(
      "SELECT username FROM users WHERE username IN ('admin', 'team', 'cashier1', 'staff1')"
    );
    const existingUsernames = new Set(existingUsers.map(u => u.username));

    const usersToInsert = [];
    if (!existingUsernames.has('admin')) {
      usersToInsert.push({
        id: adminId,
        username: 'admin',
        email: 'admin@cafedemo.com',
        password: adminPassword,
        full_name: 'محمد أحمد المدير',
        role: 'admin',
        is_active: true,
        created_at: now,
        updated_at: now,
      });
    }
    if (!existingUsernames.has('team')) {
      usersToInsert.push({
        id: managerId,
        username: 'team',
        email: 'team@cafedemo.com',
        password: teamPassword,
        full_name: 'سارة خالد المديرة',
        role: 'manager',
        is_active: true,
        created_at: now,
        updated_at: now,
      });
    }
    if (!existingUsernames.has('cashier1')) {
      usersToInsert.push({
        id: cashierId,
        username: 'cashier1',
        email: 'cashier@cafedemo.com',
        password: cashPassword,
        full_name: 'أحمد علي الكاشير',
        role: 'cashier',
        is_active: true,
        created_at: now,
        updated_at: now,
      });
    }
    if (!existingUsernames.has('staff1')) {
      usersToInsert.push({
        id: staffId,
        username: 'staff1',
        email: 'staff@cafedemo.com',
        password: cashPassword,
        full_name: 'فاطمة محمد الموظفة',
        role: 'staff',
        is_active: true,
        created_at: now,
        updated_at: now,
      });
    }

    if (usersToInsert.length > 0) {
      await queryInterface.bulkInsert('users', usersToInsert);
    }

    // Get admin UUID for foreign keys
    const [adminRows] = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE username = 'admin' LIMIT 1"
    );
    const realAdminId = adminRows[0]?.id || adminId;

    // ─────────────────────────────────────────────
    // 2. PRODUCTS (Café & Restaurant menu items)
    // ─────────────────────────────────────────────
    const [existingProducts] = await queryInterface.sequelize.query(
      "SELECT name FROM products"
    );
    const existingProductNames = new Set(existingProducts.map(p => p.name));

    const demoProducts = [
      // Hot Drinks
      { name: 'قهوة عربية', name_ar: 'قهوة عربية', description: 'قهوة عربية أصيلة محضرة بأجود الحبوب', description_ar: 'قهوة عربية أصيلة', price: 15.00, stock: 200, category: 'مشروبات ساخنة', show_online: true },
      { name: 'كابتشينو', name_ar: 'كابتشينو', description: 'كابتشينو إيطالي بالحليب الكامل الدسم', description_ar: 'كابتشينو إيطالي', price: 22.00, stock: 150, category: 'مشروبات ساخنة', show_online: true },
      { name: 'لاتيه', name_ar: 'لاتيه', description: 'لاتيه كريمي بالحليب الطازج', description_ar: 'لاتيه كريمي', price: 20.00, stock: 150, category: 'مشروبات ساخنة', show_online: true },
      { name: 'إسبريسو', name_ar: 'إسبريسو', description: 'إسبريسو مركّز بنكهة غنية', description_ar: 'إسبريسو مركّز', price: 12.00, stock: 200, category: 'مشروبات ساخنة', show_online: true },
      { name: 'شاي كرك', name_ar: 'شاي كرك', description: 'شاي كرك بالهيل والزنجبيل', description_ar: 'شاي كرك', price: 10.00, stock: 300, category: 'مشروبات ساخنة', show_online: true },
      { name: 'موكا', name_ar: 'موكا', description: 'موكا بالشوكولاتة البلجيكية والحليب', description_ar: 'موكا شوكولاتة', price: 25.00, stock: 120, category: 'مشروبات ساخنة', show_online: true },

      // Cold Drinks
      { name: 'فرابيه قهوة', name_ar: 'فرابيه قهوة', description: 'فرابيه قهوة بارد مثلج بالكريمة', description_ar: 'فرابيه قهوة', price: 28.00, stock: 100, category: 'مشروبات باردة', show_online: true },
      { name: 'لاتيه مثلج', name_ar: 'لاتيه مثلج', description: 'لاتيه بارد مثلج بالثلج الكثيف', description_ar: 'لاتيه مثلج', price: 22.00, stock: 100, category: 'مشروبات باردة', show_online: true },
      { name: 'سموذي فواكه', name_ar: 'سموذي فواكه', description: 'مزيج فواكه طازجة مع حليب', description_ar: 'سموذي فواكه', price: 25.00, stock: 80, category: 'مشروبات باردة', show_online: true },
      { name: 'عصير برتقال', name_ar: 'عصير برتقال', description: 'عصير برتقال طازج معصور', description_ar: 'عصير برتقال طازج', price: 18.00, stock: 100, category: 'مشروبات باردة', show_online: true },

      // Food
      { name: 'كرواسون لوز', name_ar: 'كرواسون لوز', description: 'كرواسون فرنسي محشو باللوز', description_ar: 'كرواسون لوز', price: 18.00, stock: 50, category: 'مخبوزات', show_online: true },
      { name: 'كيك شوكولاتة', name_ar: 'كيك شوكولاتة', description: 'كيك شوكولاتة بلجيكية بالغاناش', description_ar: 'كيك شوكولاتة', price: 35.00, stock: 30, category: 'حلويات', show_online: true },
      { name: 'تشيز كيك', name_ar: 'تشيز كيك', description: 'تشيز كيك كريمي بالتوت', description_ar: 'تشيز كيك توت', price: 40.00, stock: 25, category: 'حلويات', show_online: true },
      { name: 'ساندويش دجاج', name_ar: 'ساندويش دجاج', description: 'ساندويش دجاج مشوي مع خضروات', description_ar: 'ساندويش دجاج', price: 35.00, stock: 60, category: 'وجبات خفيفة', show_online: true },
      { name: 'بروشيتا', name_ar: 'بروشيتا', description: 'توست إيطالي بالطماطم والريحان', description_ar: 'بروشيتا إيطالية', price: 22.00, stock: 40, category: 'وجبات خفيفة', show_online: true },
      { name: 'وافل بالعسل', name_ar: 'وافل بالعسل', description: 'وافل مقرمش بالعسل والكريمة', description_ar: 'وافل بالعسل', price: 30.00, stock: 35, category: 'حلويات', show_online: true },
    ];

    const productsToInsert = demoProducts
      .filter(p => !existingProductNames.has(p.name))
      .map(p => ({
        ...p,
        created_at: now,
        updated_at: now,
      }));

    if (productsToInsert.length > 0) {
      await queryInterface.bulkInsert('products', productsToInsert);
    }

    // Get inserted product IDs
    const [allProducts] = await queryInterface.sequelize.query(
      "SELECT id, name FROM products ORDER BY id"
    );

    // ─────────────────────────────────────────────
    // 3. INVENTORY
    // ─────────────────────────────────────────────
    const [existingInventory] = await queryInterface.sequelize.query(
      'SELECT product_id FROM inventory'
    );
    const existingInventorySet = new Set(
      (existingInventory || []).map(r => Number(r.product_id))
    );

    const inventoryRows = [];
    for (const p of allProducts) {
      const pid = Number(p.id);
      if (existingInventorySet.has(pid)) continue;
      
      const productData = demoProducts.find(dp => dp.name === p.name);
      inventoryRows.push({
        product_id: pid,
        quantity: productData?.stock || 100,
        location: 'المخزن الرئيسي',
        min_quantity: 10,
        created_at: now,
        updated_at: now,
      });
    }

    if (inventoryRows.length > 0) {
      await queryInterface.bulkInsert('inventory', inventoryRows);
    }

    // ─────────────────────────────────────────────
    // 4. CUSTOMERS
    // ─────────────────────────────────────────────
    const [existingCustomers] = await queryInterface.sequelize.query(
      "SELECT email FROM customers WHERE deleted_at IS NULL"
    );
    const existingEmails = new Set(existingCustomers.map(c => c.email).filter(Boolean));

    const demoCustomers = [
      { name: 'عبدالله محمد الغامدي', email: 'abdullah@demo.com', phone: '+966501234567', city: 'الرياض', country: 'Saudi Arabia', notes: 'عميل VIP - يفضل قهوة عربية' },
      { name: 'نورة سعد العتيبي', email: 'noura@demo.com', phone: '+966502345678', city: 'جدة', country: 'Saudi Arabia', notes: 'تطلب دائماً لاتيه مثلج' },
      { name: 'خالد أحمد الدوسري', email: 'khaled@demo.com', phone: '+966503456789', city: 'الدمام', country: 'Saudi Arabia', notes: 'مدير شركة' },
      { name: 'ريم فهد الشمري', email: 'reem@demo.com', phone: '+966504567890', city: 'مكة', country: 'Saudi Arabia', notes: '' },
      { name: 'فيصل عمر الزهراني', email: 'faisal@demo.com', phone: '+966505678901', city: 'المدينة', country: 'Saudi Arabia', notes: 'يفضل الجلوس في الحديقة' },
      { name: 'هند عبدالرحمن', email: 'hind@demo.com', phone: '+966506789012', city: 'الرياض', country: 'Saudi Arabia', notes: '' },
      { name: 'سلطان محمد القحطاني', email: 'sultan@demo.com', phone: '+966507890123', city: 'الطائف', country: 'Saudi Arabia', notes: 'عميل منتظم' },
      { name: 'منى يوسف الحربي', email: 'mona@demo.com', phone: '+966508901234', city: 'جدة', country: 'Saudi Arabia', notes: '' },
    ];

    const customersToInsert = demoCustomers
      .filter(c => !existingEmails.has(c.email))
      .map(c => ({
        ...c,
        is_active: true,
        created_at: now,
        updated_at: now,
      }));

    if (customersToInsert.length > 0) {
      await queryInterface.bulkInsert('customers', customersToInsert);
    }

    // Get customer IDs
    const [allCustomers] = await queryInterface.sequelize.query(
      "SELECT id FROM customers WHERE deleted_at IS NULL ORDER BY id"
    );
    const customerIds = allCustomers.map(c => c.id);

    // ─────────────────────────────────────────────
    // 5. SALES & SALE ITEMS (last 30 days)
    // ─────────────────────────────────────────────
    const productMap = {};
    for (const p of allProducts) {
      const demo = demoProducts.find(dp => dp.name === p.name);
      if (demo) productMap[p.id] = demo.price;
    }
    const productIds = Object.keys(productMap);

    if (productIds.length === 0 || customerIds.length === 0) {
      console.log('No products or customers found, skipping sales seeding');
      return;
    }

    const paymentMethods = ['cash', 'credit_card', 'debit_card', 'mobile_payment'];
    const salesToInsert = [];
    const saleItemsToInsert = [];

    // Generate 60 sales over the last 30 days
    for (let day = 29; day >= 0; day--) {
      const salesPerDay = Math.floor(Math.random() * 4) + 2; // 2-5 sales per day
      
      for (let s = 0; s < salesPerDay; s++) {
        const saleDate = new Date(now);
        saleDate.setDate(saleDate.getDate() - day);
        saleDate.setHours(Math.floor(Math.random() * 12) + 8); // 8am-8pm
        saleDate.setMinutes(Math.floor(Math.random() * 60));

        const saleId = uuidv4();
        const numItems = Math.floor(Math.random() * 4) + 1; // 1-4 items
        
        let subtotal = 0;
        const items = [];
        
        // Pick random products
        const shuffled = [...productIds].sort(() => Math.random() - 0.5);
        const selectedProducts = shuffled.slice(0, numItems);
        
        for (const pid of selectedProducts) {
          const qty = Math.floor(Math.random() * 3) + 1;
          const unitPrice = parseFloat(productMap[pid]);
          const lineTotal = qty * unitPrice;
          subtotal += lineTotal;
          
          items.push({
            id: uuidv4(),
            sale_id: saleId,
            product_id: parseInt(pid),
            quantity: qty,
            unit_price: unitPrice,
            total_price: lineTotal,
            created_at: saleDate,
            updated_at: saleDate,
          });
        }

        const taxRate = 0.15; // 15% VAT
        const taxAmount = parseFloat((subtotal * taxRate).toFixed(2));
        const discount = Math.random() > 0.7 ? parseFloat((subtotal * 0.1).toFixed(2)) : 0;
        const totalAmount = parseFloat((subtotal + taxAmount - discount).toFixed(2));
        
        const customerId = Math.random() > 0.3 
          ? customerIds[Math.floor(Math.random() * customerIds.length)] 
          : null;

        const receiptNum = `REC-${saleDate.getFullYear()}${String(saleDate.getMonth()+1).padStart(2,'0')}${String(saleDate.getDate()).padStart(2,'0')}-${String(s+1).padStart(3,'0')}-${day}`;

        salesToInsert.push({
          id: saleId,
          sale_date: saleDate,
          subtotal: subtotal.toFixed(2),
          tax_amount: taxAmount,
          discount_amount: discount,
          total_amount: totalAmount,
          payment_method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
          payment_status: 'paid',
          status: 'completed',
          source: Math.random() > 0.8 ? 'online' : 'pos',
          customer_id: customerId,
          user_id: realAdminId,
          receipt_number: receiptNum,
          notes: null,
          created_at: saleDate,
          updated_at: saleDate,
        });

        saleItemsToInsert.push(...items);
      }
    }

    if (salesToInsert.length > 0) {
      await queryInterface.bulkInsert('sales', salesToInsert);
    }
    if (saleItemsToInsert.length > 0) {
      await queryInterface.bulkInsert('sale_items', saleItemsToInsert);
    }

    console.log(`✅ Demo data seeded successfully!`);
    console.log(`   👥 Users: ${usersToInsert.length} added`);
    console.log(`   🛍️  Products: ${productsToInsert.length} added`);
    console.log(`   👤 Customers: ${customersToInsert.length} added`);
    console.log(`   🧾 Sales: ${salesToInsert.length} added`);
    console.log(`   📦 Sale Items: ${saleItemsToInsert.length} added`);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove demo sale items first (FK constraint)
    await queryInterface.sequelize.query(
      `DELETE si FROM sale_items si
       INNER JOIN sales s ON si.sale_id = s.id
       WHERE s.receipt_number LIKE 'REC-%'`
    ).catch(() => {
      // PostgreSQL syntax
      return queryInterface.sequelize.query(
        `DELETE FROM sale_items WHERE sale_id IN (SELECT id FROM sales WHERE receipt_number LIKE 'REC-%')`
      );
    });

    await queryInterface.bulkDelete('sales', { receipt_number: { [Sequelize.Op.like]: 'REC-%' } }, {});
    await queryInterface.bulkDelete('customers', {
      email: { [Sequelize.Op.in]: [
        'abdullah@demo.com', 'noura@demo.com', 'khaled@demo.com',
        'reem@demo.com', 'faisal@demo.com', 'hind@demo.com',
        'sultan@demo.com', 'mona@demo.com'
      ]}
    }, {});
    await queryInterface.bulkDelete('users', {
      username: { [Sequelize.Op.in]: ['cashier1', 'staff1'] }
    }, {});
  },
};
