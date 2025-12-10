# Quick Implementation Examples

This file shows practical examples of how to implement the new UI components in your pages.

---

## Form Example

```jsx
import { useState } from 'react';
import FormInput from '../components/common/FormInput';
import FormTextarea from '../components/common/FormTextarea';
import FormSelect from '../components/common/FormSelect';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Submit form
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', product: '', message: '' });
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      {success && (
        <Alert
          type="success"
          title="Message Sent"
          message="We'll get back to you soon!"
          onClose={() => setSuccess(false)}
        />
      )}

      {errors.submit && (
        <Alert
          type="error"
          title="Error"
          message={errors.submit}
          onClose={() => setErrors({ ...errors, submit: '' })}
        />
      )}

      <FormInput
        label="Full Name"
        icon="user"
        placeholder="John Doe"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        required
      />

      <FormInput
        label="Email Address"
        type="email"
        icon="envelope"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        hint="We'll never share your email"
        required
      />

      <FormSelect
        label="Product Type"
        options={[
          { label: 'Pneumatic Actuators', value: 'pneumatic' },
          { label: 'Electro-Hydraulic', value: 'hydraulic' },
          { label: 'Electrical', value: 'electrical' }
        ]}
        icon="cogs"
        value={formData.product}
        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
      />

      <FormTextarea
        label="Message"
        placeholder="Tell us more about your inquiry..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={errors.message}
        maxLength={500}
        rows={5}
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        icon="send"
        loading={loading}
        className="w-full"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

---

## Product Card Grid Example

```jsx
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} hover shadow="lg">
          <div className="relative mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            {product.featured && (
              <Badge variant="primary" size="sm" icon="star" className="absolute top-3 right-3">
                Featured
              </Badge>
            )}
          </div>

          <h3 className="text-lg font-bold text-secondary-900 mb-2">
            {product.name}
          </h3>

          <p className="text-secondary-600 text-sm mb-4">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-primary-600">
              {product.torque}
            </span>
            <Badge variant="info" size="sm">
              {product.type}
            </Badge>
          </div>

          <ul className="text-sm text-secondary-600 space-y-1 mb-4">
            {product.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                {feature}
              </li>
            ))}
          </ul>

          <Button variant="outline" className="w-full" icon="arrow-right" iconPosition="right">
            View Details
          </Button>
        </Card>
      ))}
    </div>
  );
}
```

---

## Tab Navigation Example

```jsx
import Tabs from '../components/common/Tabs';

export default function ProductDetails() {
  const tabs = [
    {
      label: 'Overview',
      icon: 'info-circle',
      content: (
        <div>
          <h3 className="font-bold mb-2">Product Overview</h3>
          <p>Detailed product description and features...</p>
        </div>
      )
    },
    {
      label: 'Specifications',
      icon: 'list',
      content: (
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-semibold">Torque Range</td>
              <td>10 - 5,425 Nm</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-semibold">Pressure</td>
              <td>2.8 - 8 bar</td>
            </tr>
          </tbody>
        </table>
      )
    },
    {
      label: 'Applications',
      icon: 'cubes',
      content: (
        <ul className="space-y-2">
          <li className="flex items-center">
            <i className="fas fa-check text-green-500 mr-2"></i>
            Ball Valves
          </li>
          <li className="flex items-center">
            <i className="fas fa-check text-green-500 mr-2"></i>
            Butterfly Valves
          </li>
        </ul>
      )
    }
  ];

  return <Tabs tabs={tabs} defaultTab={0} />;
}
```

---

## Modal Dialog Example

```jsx
import { useState } from 'react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

export default function ProductComparison() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} icon="plus">
        Compare Products
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Compare Products"
        size="2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Feature</th>
                <th className="px-4 py-2">Product A</th>
                <th className="px-4 py-2">Product B</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Torque</td>
                <td className="px-4 py-2 text-center">100 Nm</td>
                <td className="px-4 py-2 text-center">200 Nm</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold">Pressure</td>
                <td className="px-4 py-2 text-center">5 bar</td>
                <td className="px-4 py-2 text-center">8 bar</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsOpen(false)}
          >
            Download Comparison
          </Button>
        </div>
      </Modal>
    </>
  );
}
```

---

## Loading State Example

```jsx
import { useState, useEffect } from 'react';
import SkeletonLoader from '../components/common/SkeletonLoader';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader type="card" count={3} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id}>
          {/* Product card content */}
        </div>
      ))}
    </div>
  );
}
```

---

## Empty State Example

```jsx
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

export default function SearchResults({ results, onReset }) {
  if (results.length === 0) {
    return (
      <EmptyState
        icon="search"
        title="No Results Found"
        description="Try adjusting your search terms or filters"
        action={onReset}
        actionLabel="Reset Search"
        actionIcon="redo"
      />
    );
  }

  return (
    <div>
      {/* Results list */}
    </div>
  );
}
```

---

## Breadcrumb Navigation Example

```jsx
import Breadcrumb from '../components/common/Breadcrumb';

export default function ProductPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Pneumatic Actuators', href: '/products#pneumatic' },
    { label: 'PDS Series' }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      {/* Page content */}
    </>
  );
}
```

---

## Pagination Example

```jsx
import { useState } from 'react';
import Pagination from '../components/common/Pagination';

export default function ProductsCatalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Products list */}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
```

---

## Accessibility Example

```jsx
import { useKeyboardNavigation, useAriaLive } from '../hooks/useAccessibility';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';

export default function AccessibleForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = () => {
    useAriaLive('Form submitted successfully', 'polite');
    // Handle submission
  };

  useKeyboardNavigation(
    handleSubmit,  // Enter
    () => {} // Escape
  );

  return (
    <form
      role="form"
      aria-label="Login form"
      onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
    >
      <FormInput
        label="Email"
        type="email"
        icon="envelope"
        aria-required="true"
        required
      />

      <FormInput
        label="Password"
        type="password"
        icon="lock"
        aria-required="true"
        required
      />

      <Button type="submit" aria-label="Submit login form">
        Login
      </Button>
    </form>
  );
}
```

---

## Best Practices

### 1. Always Validate Forms

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  const errors = {};
  if (!email) errors.email = 'Email is required';
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  // Submit form
};
```

### 2. Show Loading States

```jsx
<Button loading={isSubmitting} disabled={isSubmitting}>
  Save Changes
</Button>
```

### 3. Provide Feedback

```jsx
{success && <Alert type="success" message="Saved successfully!" />}
{error && <Alert type="error" message={error} />}
```

### 4. Use Proper ARIA Labels

```jsx
<Modal
  isOpen={isOpen}
  aria-label="Confirm deletion"
  onClose={handleClose}
>
```

### 5. Handle Accessibility

```jsx
<FormInput
  label="Product"
  aria-required="true"
  aria-describedby="product-hint"
  hint="Select a product type"
  required
/>
```

---

## Common Issues & Solutions

### Issue: Form Validation Not Working

**Solution**: Ensure errors are cleared after successful submission

```jsx
const handleSubmit = async () => {
  setErrors({}); // Clear errors first
  // Validate...
};
```

### Issue: Modal Not Closing

**Solution**: Check if state is properly updated

```jsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
```

### Issue: Accessibility Score Low

**Solution**:

- Add aria-labels to all interactive elements
- Use semantic HTML
- Test with screen readers
- Check color contrast

---

## Testing Components

### Unit Test Example

```jsx
import { render, screen } from '@testing-library/react';
import Button from '../components/common/Button';

test('Button renders with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('Button calls onClick handler', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  screen.getByText('Click me').click();
  expect(handleClick).toHaveBeenCalled();
});
```

---

## Resources

- Full component documentation: `UI_IMPROVEMENTS_GUIDE.md`
- Tailwind CSS: <https://tailwindcss.com/docs>
- React Documentation: <https://react.dev>
- WCAG Guidelines: <https://www.w3.org/WAI/WCAG21/quickref/>
