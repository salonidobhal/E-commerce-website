import React,{Component} from 'react';
import { storeProducts, detailProduct  } from './data';

const ProductContext=React.createContext();
//whenever we create a context object it comes with 2 components
//provider
//consumer

class ProductProvider extends Component{
	state={
		products:[], 
		detailProduct: detailProduct,
		cart:[]	
};
	componentDidMount(){
		this.setProducts();
	}

	setProducts=()=>{
		let tempProducts=[];
		storeProducts.forEach(item => {
			const singleItem={...item};
			tempProducts=[...tempProducts,singleItem];
		});
		this.setState(()=>{
			return {products:tempProducts};
		})
	}
	getItem=(id)=>{
		const product=this.state.products.find(item=>item.id===id)
		return product;
	};
	handleDetail=(id)=>{
		const product=this.getItem(id);
		this.setState(()=>{
			return {detailProduct:product}
		})	
	};

	addToCart=(id)=>{
		let tempProducts=[...this.state.products]
		const index=tempProducts.indexOf(this.getItem(id));
		const product=tempProducts[index];
		product.inCart=true;
		product.count=1;
		const price=product.price;
		product.total=price;
		this.setState(
			()=>{
				return{ products: tempProducts, cart:[...this.state.cart, product]};
			},
			()=>{ console.log(this.state);}
		)

	}  
	/*tester= () => {
		console.log('State Products:',this.state.products[0].inCart);
		console.log('Data Products:', storeProducts[0].inCart);

		 const tempProducts= [...this.state.products];
		 tempProducts[0].inCart=true
		 this.setState(()=>{
		 	return{products:tempProducts} 
		 },()=>{
		 	console.log('State Products:',this.state.products[0].inCart);
		console.log('Data Products:', storeProducts[0].inCart);
		 })
	}*/
	render(){
		return(
			<ProductContext.Provider 
				value={{...this.state,
					handleDetail:this.handleDetail,
					addToCart:this.addToCart}}>
				{this.props.children}
			</ProductContext.Provider>
		)
	}
} 
const ProductConsumer= ProductContext.Consumer;

export { ProductProvider, ProductConsumer };