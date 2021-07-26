// import _uniqBy from 'lodash/uniqBy';
// import { suffixValue } from 'modules/Layout/helper/misc';
// import Order from 'modules/Order/model/Order';
// import { OrderAuthor } from 'modules/Order/type';
// import { getError, hasError } from 'modules/Shared/helper/validation';
// import { ValidationErrors } from 'modules/Shared/type';
// import React from 'react';
// import { CustomInput, FormFeedback, Label } from 'reactstrap';

// export interface OrdersFieldsetProps {
//   label?: string;
//   orders: Order[];
//   authors?: OrderAuthor[];
//   deleting?: boolean;
//   errors?: ValidationErrors;
//   disabled?: boolean;
//   required?: boolean;
//   onChange: (authors: OrderAuthor[]) => void;
// }

// class OrdersFieldset extends React.Component<OrdersFieldsetProps> {
//   constructor(props: OrdersFieldsetProps) {
//     super(props);

//     this.onRadioChange = this.onRadioChange.bind(this);
//     this.onSelectChange = this.onSelectChange.bind(this);
//     this.getAuthors = this.getAuthors.bind(this);
//     this.getAuthor = this.getAuthor.bind(this);
//     this.renderOrder = this.renderOrder.bind(this);
//     this.renderMoveToDepartment = this.renderMoveToDepartment.bind(this);
//     this.renderPossibleAuthors = this.renderPossibleAuthors.bind(this);
//   }

//   onRadioChange(author: OrderAuthor): void {
//     const { onChange } = this.props;

//     const item: OrderAuthor = {
//       ...author,
//       author_id: undefined
//     };

//     onChange(this.getAuthors(item));
//   }

//   onSelectChange(author: OrderAuthor, value: number): void {
//     const { onChange } = this.props;

//     const item: OrderAuthor = {
//       ...author,
//       author_id: value || undefined
//     };

//     onChange(this.getAuthors(item));
//   }

//   getAuthors(author: OrderAuthor): OrderAuthor[] {
//     const { authors = [] } = this.props;

//     const concat = [author, ...authors];

//     return _uniqBy<OrderAuthor>(concat, 'order_id');
//   }

//   getAuthor(order: Order): OrderAuthor {
//     const { authors = [] } = this.props;

//     const author = authors.find((value) => value.order_id === order.id);

//     return author || { order_id: order.id };
//   }

//   renderOrder(order: Order, index: number): React.ReactNode {
//     const { deleting = false, errors } = this.props;

//     const author = this.getAuthor(order);

//     const { move_to_department } = author;

//     return (
//       <div key={order.id} className={index > 0 ? 'mt-2' : ''}>
//         <Label className="m-0">{suffixValue(order.name)}</Label>
//         {hasError(errors, `${index}.order_id`) && (
//           <FormFeedback className="d-block">
//             {getError(errors, `${index}.order_id`)}
//           </FormFeedback>
//         )}
//         {deleting === false &&
//           this.renderMoveToDepartment(order, index, author)}
//         {(deleting === true || move_to_department === false) &&
//           this.renderPossibleAuthors(order, index, author)}
//       </div>
//     );
//   }

//   renderMoveToDepartment(
//     order: Order,
//     index: number,
//     author: OrderAuthor
//   ): React.ReactNode {
//     const { disabled, errors, required = false } = this.props;

//     const { move_to_department } = author;

//     return (
//       <div className="mt-2">
//         <CustomInput
//           type="radio"
//           name={`order-move-${order.id}`}
//           id={`order-move-${order.id}.yes`}
//           label="Przenieś razem z użytkownikiem"
//           checked={move_to_department === true}
//           required={required}
//           disabled={disabled}
//           invalid={hasError(errors, `${index}.move_to_department`)}
//           onChange={() =>
//             this.onRadioChange({
//               ...author,
//               move_to_department: true
//             })
//           }
//         />
//         <CustomInput
//           type="radio"
//           name={`order-move-${order.id}`}
//           id={`order-move-${order.id}.no`}
//           label="Wskaż nowego autora"
//           checked={move_to_department === false}
//           required={required}
//           disabled={disabled}
//           invalid={hasError(errors, `${index}.move_to_department`)}
//           onChange={() =>
//             this.onRadioChange({
//               ...author,
//               move_to_department: false
//             })
//           }
//         />
//         {hasError(errors, `${index}.move_to_department`) && (
//           <FormFeedback>
//             {getError(errors, `${index}.move_to_department`)}
//           </FormFeedback>
//         )}
//       </div>
//     );
//   }

//   renderPossibleAuthors(
//     order: Order,
//     index: number,
//     author: OrderAuthor
//   ): React.ReactNode {
//     const { disabled, errors, required = false } = this.props;

//     const { author_id = '' } = author;

//     return (
//       <div className="mt-2">
//         <CustomInput
//           type="select"
//           name={`order-author-${order.id}`}
//           id={`order-author-${order.id}`}
//           value={author_id}
//           invalid={hasError(errors, `${index}.author_id`)}
//           disabled={disabled}
//           required={required}
//           onChange={(event) =>
//             this.onSelectChange(author, Number(event.target.value))
//           }
//         >
//           <option value="">
//             {suffixValue('Wybierz użytkownika', required)}
//           </option>
//           {order.possible_authors.map(({ id, name }) => (
//             <option value={id} key={id}>
//               {name}
//             </option>
//           ))}
//         </CustomInput>
//         {hasError(errors, `${index}.author_id`) && (
//           <FormFeedback>{getError(errors, `${index}.author_id`)}</FormFeedback>
//         )}
//       </div>
//     );
//   }

//   render(): React.ReactNode {
//     const { label = 'Postępowania', orders, errors, disabled } = this.props;

//     return (
//       <fieldset disabled={disabled}>
//         {label && <Label>{label}</Label>}
//         {errors && Array.isArray(errors) && (
//           <FormFeedback className="d-block mt-0 mb-1">{errors[0]}</FormFeedback>
//         )}
//         {orders.map(this.renderOrder)}
//       </fieldset>
//     );
//   }
// }

// export default OrdersFieldset;
