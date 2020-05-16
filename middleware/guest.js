export default function ({ store, redirect }) {
  if (store.state.auth.check) {
    return redirect('/');
  }
}
