import { of } from 'rxjs';

export class NgxSmartModalServiceMock {
  create(): any {
    return {
      setData(data: any) {
        return {
          open() {
            return {
              onClose: of({}),
              onDataAdded: of(data),
              onCloseFinished: of({}),
              onDismissFinished: of({}),
            };
          },
        };
      },
    };
  }

  getModal(): any {
    return {
      open: function () {
        return;
      },
      close: function () {
        return;
      },
      isVisible: function () {
        return;
      },
      onOpen: of({}),
      onAnyCloseEvent: of({}),
      onAnyCloseEventFinished: of({}),
    };
  }

  get(): any {
    return {
      open: function () {
        return;
      },
      close: function () {
        return;
      },
      isVisible: function () {
        return;
      },
      getData: function() {
        return {};
      },
      setData: function() {
        return;
      },
      onOpen: of({}),
      onAnyCloseEvent: of({
        removeData() {
          return;
        },
      }),
      onAnyCloseEventFinished: of({
        removeData() {
          return;
        },
      }),
    };
  }

  setModalData(): void {
    return;
  }

  open(): void {
    return;
  }

  getModalStackCount(): void {
    return;
  }

  addModal(): void {
    return;
  }

  removeModal(): void {
    return;
  }
}
