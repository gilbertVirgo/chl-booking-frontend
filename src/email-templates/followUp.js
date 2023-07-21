import readableDate from "../helpers/readableDate";

export default (booking, customer) => `
    To ${customer.firstname} ... %0A%0A

    [[ (1.) Select 'Templates' (or ⌘⇧T) → 'Follow Up' at the bottom, then (2.) remove this text. ]] %0A%0A
`;
