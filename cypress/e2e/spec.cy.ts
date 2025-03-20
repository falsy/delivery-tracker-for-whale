describe("배송 조회 페이지", () => {
  beforeEach(() => {
    // 배송 조회 박스 추가
    cy.intercept("GET", "https://parcel.falsy.me/carriers").as("getCarriers")
    cy.visit("http://localhost:2000")
    cy.wait("@getCarriers")
    cy.get("button[aria-label='추가']").click()
    cy.wait(500)
    cy.get("#tracker-list").find("li").should("exist")
  })

  it("배송 조회 박스 삭제", () => {
    cy.get("button[aria-label='delete-button']").click()
    cy.wait(500)
    cy.get("#tracker-list").should("not.exist")
  })

  it("초기화", () => {
    cy.get("button[aria-label='reset-button']").click()
    cy.wait(500)
    cy.get("#tracker-list").should("not.exist")
  })

  it("택배사 변경", () => {
    cy.get("button[data-testid='carrier-select-box']").click()
    cy.wait(500)
    cy.get("div[role='listbox']").should("exist")
    cy.get("div[role='listbox']")
      .find("div")
      .eq(1)
      .invoke("text")
      .then((selectedText) => {
        cy.get("div[role='listbox']").find("div").eq(1).click()
        cy.get("button[data-testid='carrier-select-box']").should(
          "have.text",
          selectedText.trim()
        )
      })
  })

  it("메모 추가 및 삭제", () => {
    cy.get("#create-memo-button").click()
    cy.wait(500)
    cy.get("#memo-list").find("li").should("exist")
    cy.wait(500)
    cy.get("#memo-list")
      .find("li")
      .eq(0)
      .find("button[aria-label='delete-memo-button']")
      .click()
  })
})
